
import "server-only";

import {
  Unzip,
  UnzipInflate,
} from "fflate";

const ARQUIVO_CANDIDATOS_2024 =
  "https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2024.zip";

const LIMITE_DOWNLOAD_BYTES =
  120 * 1024 * 1024;

const LIMITE_ARQUIVOS =
  200;

export type ArquivoDentroZIP = {
  nome: string;
  tamanhoCompactado: number | null;
  tamanhoOriginal: number | null;
};

export type ResultadoInspecaoZIP = {
  sucesso: boolean;
  fonte: string;
  endereco: string;
  quantidadeArquivos: number;
  quantidadeCSVs: number;
  arquivos: ArquivoDentroZIP[];
};

export async function inspecionarZIPCandidatos2024TSE():
Promise<ResultadoInspecaoZIP> {
  const resposta = await fetch(
    ARQUIVO_CANDIDATOS_2024,
    {
      cache: "no-store",
      headers: {
        Accept: "application/zip, application/octet-stream",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `Falha ao baixar ZIP do TSE: HTTP ${resposta.status}`
    );
  }

  if (!resposta.body) {
    throw new Error(
      "O servidor do TSE não disponibilizou o fluxo do arquivo ZIP."
    );
  }

  const tamanhoInformado =
    Number(resposta.headers.get("content-length") ?? 0);

  if (
    tamanhoInformado > LIMITE_DOWNLOAD_BYTES
  ) {
    throw new Error(
      "O arquivo ZIP ultrapassa o limite de segurança de 120 MB."
    );
  }

  const arquivos: ArquivoDentroZIP[] = [];

  const descompactador = new Unzip((arquivo) => {
    if (arquivos.length >= LIMITE_ARQUIVOS) {
      return;
    }

    arquivos.push({
      nome: arquivo.name,
      tamanhoCompactado:
        arquivo.size ?? null,
      tamanhoOriginal:
        arquivo.originalSize ?? null,
    });
  });

  // Registra suporte ao método DEFLATE.
  // Nesta etapa não extraímos o conteúdo dos arquivos.
  descompactador.register(UnzipInflate);

  const leitor = resposta.body.getReader();

  let totalRecebido = 0;

  try {
    while (true) {
      const { done, value } =
        await leitor.read();

      if (done) {
        descompactador.push(
          new Uint8Array(0),
          true
        );

        break;
      }

      totalRecebido += value.byteLength;

      if (
        totalRecebido > LIMITE_DOWNLOAD_BYTES
      ) {
        await leitor.cancel();

        throw new Error(
          "O download ultrapassou o limite de segurança de 120 MB."
        );
      }

      descompactador.push(
        new Uint8Array(value),
        false
      );
    }
  } finally {
    leitor.releaseLock();
  }

  const arquivosCSV = arquivos.filter(
    (arquivo) =>
      arquivo.nome.toLowerCase().endsWith(".csv")
  );

  return {
    sucesso: true,
    fonte: "TSE - Dados Abertos",
    endereco: ARQUIVO_CANDIDATOS_2024,
    quantidadeArquivos: arquivos.length,
    quantidadeCSVs: arquivosCSV.length,
    arquivos,
  };
}
