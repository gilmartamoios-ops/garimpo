
import "server-only";

import {
  Unzip,
  UnzipInflate,
} from "fflate";

import {
  lerArquivoCSVdoTSE,
  type ResultadoLeituraTSE,
} from "@/lib/conectores/leitor-csv-tse";

const ARQUIVO_CANDIDATOS_2024 =
  "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2024.zip";

const ARQUIVO_RJ =
  "consulta_cand_2024_RJ.csv";

const LIMITE_DOWNLOAD_BYTES =
  120 * 1024 * 1024;

export type ResultadoInspecaoZIP = {
  sucesso: boolean;
  fonte: string;
  quantidadeArquivos: number;
  quantidadeCSVs: number;
  arquivos: {
    nome: string;
    tamanhoCompactado: number | null;
    tamanhoOriginal: number | null;
  }[];
};

export type ResultadoAmostraTSE = {
  sucesso: boolean;
  fonte: string;
  arquivo: string;
  estado: string;
  quantidadeRegistros: number;
  quantidadeColunas: number;
  colunas: string[];
  registros: ResultadoLeituraTSE["registros"];
};

export async function inspecionarZIPCandidatos2024TSE():
Promise<ResultadoInspecaoZIP> {
  const resposta = await fetch(
    ARQUIVO_CANDIDATOS_2024,
    {
      cache: "no-store",
    }
  );

  if (!resposta.ok || !resposta.body) {
    throw new Error(
      `Não foi possível acessar o ZIP do TSE: HTTP ${resposta.status}`
    );
  }

  const tamanhoInformado =
    Number(resposta.headers.get("content-length") ?? 0);

  if (tamanhoInformado > LIMITE_DOWNLOAD_BYTES) {
    throw new Error(
      "O ZIP ultrapassa o limite de segurança de 120 MB."
    );
  }

  const arquivos: ResultadoInspecaoZIP["arquivos"] = [];

  const descompactador = new Unzip((arquivo) => {
    arquivos.push({
      nome: arquivo.name,
      tamanhoCompactado: arquivo.size ?? null,
      tamanhoOriginal: arquivo.originalSize ?? null,
    });
  });

  descompactador.register(UnzipInflate);

  const leitor = resposta.body.getReader();

  let totalRecebido = 0;

  try {
    while (true) {
      const { done, value } = await leitor.read();

      if (done) {
        descompactador.push(new Uint8Array(0), true);
        break;
      }

      totalRecebido += value.byteLength;

      if (totalRecebido > LIMITE_DOWNLOAD_BYTES) {
        await leitor.cancel();

        throw new Error(
          "O download ultrapassou 120 MB."
        );
      }

      descompactador.push(value, false);
    }
  } finally {
    leitor.releaseLock();
  }

  return {
    sucesso: true,
    fonte: "TSE - Dados Abertos",
    quantidadeArquivos: arquivos.length,
    quantidadeCSVs: arquivos.filter(
      (arquivo) => arquivo.nome.toLowerCase().endsWith(".csv")
    ).length,
    arquivos,
  };
}

export async function buscarAmostraCandidatosRJ2024TSE(
  limiteRegistros = 20
): Promise<ResultadoAmostraTSE> {
  if (
    !Number.isInteger(limiteRegistros) ||
    limiteRegistros < 1 ||
    limiteRegistros > 100
  ) {
    throw new Error(
      "O limite deve estar entre 1 e 100 registros."
    );
  }

  const resposta = await fetch(
    ARQUIVO_CANDIDATOS_2024,
    {
      cache: "no-store",
    }
  );

  if (!resposta.ok || !resposta.body) {
    throw new Error(
      `Falha ao acessar o ZIP do TSE: HTTP ${resposta.status}`
    );
  }

  const tamanhoInformado =
    Number(resposta.headers.get("content-length") ?? 0);

  if (tamanhoInformado > LIMITE_DOWNLOAD_BYTES) {
    throw new Error(
      "O ZIP ultrapassa o limite de segurança de 120 MB."
    );
  }

  let resultado: ResultadoLeituraTSE | null = null;
  let arquivoEncontrado = false;
  let erroExtracao: Error | null = null;
  let totalRecebido = 0;

  const partes: Uint8Array[] = [];

  const descompactador = new Unzip((arquivo) => {
    if (arquivo.name !== ARQUIVO_RJ) {
      return;
    }

    arquivoEncontrado = true;

    arquivo.ondata = (erro, dados, final) => {
      if (erro) {
        erroExtracao = erro;
        return;
      }

      try {
        if (resultado) {
          return;
        }

        partes.push(dados);

        if (final) {
          const tamanho = partes.reduce(
            (total, parte) => total + parte.length,
            0
          );

          const conteudo = new Uint8Array(tamanho);

          let posicao = 0;

          for (const parte of partes) {
            conteudo.set(parte, posicao);
            posicao += parte.length;
          }

          resultado = lerArquivoCSVdoTSE(
            conteudo,
            limiteRegistros
          );
        }
      } catch (erro) {
        erroExtracao =
          erro instanceof Error
            ? erro
            : new Error(
                "Erro ao interpretar o CSV do TSE."
              );
      }
    };

    arquivo.start();
  });

  descompactador.register(UnzipInflate);

  const leitor = resposta.body.getReader();

  try {
    while (true) {
      const { done, value } = await leitor.read();

      if (done) {
        descompactador.push(new Uint8Array(0), true);
        break;
      }

      totalRecebido += value.byteLength;

      if (totalRecebido > LIMITE_DOWNLOAD_BYTES) {
        await leitor.cancel();

        throw new Error(
          "O download ultrapassou 120 MB."
        );
      }

      descompactador.push(value, false);

      // Interrompe o download assim que o CSV do RJ
      // terminar de ser extraído e interpretado.
      if (resultado || erroExtracao) {
        await leitor.cancel();
        break;
      }
    }
  } finally {
    leitor.releaseLock();
  }

  if (erroExtracao) {
    throw erroExtracao;
  }

  if (!arquivoEncontrado) {
    throw new Error(
      "O CSV de candidaturas do Rio de Janeiro não foi encontrado no ZIP."
    );
  }

  if (!resultado) {
    throw new Error(
      "Não foi possível concluir a extração do CSV do Rio de Janeiro."
    );
  }

  return {
    sucesso: true,
    fonte: "TSE - Dados Abertos",
    arquivo: ARQUIVO_RJ,
    estado: "RJ",
    quantidadeRegistros: resultado.quantidadeRegistros,
    quantidadeColunas: resultado.quantidadeColunas,
    colunas: resultado.colunas,
    registros: resultado.registros,
  };
}
