
import "server-only";

export type RegistroTSE = Record<string, string | null>;

export type ResultadoLeituraTSE = {
  sucesso: boolean;
  quantidadeRegistros: number;
  quantidadeColunas: number;
  colunas: string[];
  registros: RegistroTSE[];
};

function normalizarValor(valor: string): string | null {
  const limpo = valor.trim();

  if (limpo === "" || limpo === "#NULO") {
    return null;
  }

  return limpo;
}

export function decodificarCSVTSE(
  arquivo: Uint8Array
): string {
  const decoder = new TextDecoder("iso-8859-1");
  return decoder.decode(arquivo);
}

function separarCSV(
  conteudo: string,
  limiteLinhas = 0
): string[][] {
  const linhas: string[][] = [];

  let linha: string[] = [];
  let campo = "";
  let dentroDeAspas = false;

  for (let i = 0; i < conteudo.length; i++) {
    const caractere = conteudo[i];
    const proximo = conteudo[i + 1];

    if (caractere === '"') {
      if (dentroDeAspas && proximo === '"') {
        campo += '"';
        i++;
      } else {
        dentroDeAspas = !dentroDeAspas;
      }

      continue;
    }

    if (caractere === ";" && !dentroDeAspas) {
      linha.push(campo);
      campo = "";
      continue;
    }

    if (
      (caractere === "\n" || caractere === "\r") &&
      !dentroDeAspas
    ) {
      linha.push(campo);

      if (linha.some((valor) => valor.trim() !== "")) {
        linhas.push(linha);
      }

      linha = [];
      campo = "";

      if (caractere === "\r" && proximo === "\n") {
        i++;
      }

      if (
        limiteLinhas > 0 &&
        linhas.length >= limiteLinhas
      ) {
        return linhas;
      }

      continue;
    }

    campo += caractere;
  }

  if (dentroDeAspas) {
    throw new Error(
      "Arquivo CSV inválido: existe um campo com aspas não fechadas."
    );
  }

  if (campo !== "" || linha.length > 0) {
    linha.push(campo);

    if (linha.some((valor) => valor.trim() !== "")) {
      linhas.push(linha);
    }
  }

  return linhas;
}

export function lerCSVdoTSE(
  conteudo: string,
  limiteRegistros = 0
): ResultadoLeituraTSE {
  if (!conteudo || !conteudo.trim()) {
    throw new Error("O arquivo CSV está vazio.");
  }

  if (
    !Number.isInteger(limiteRegistros) ||
    limiteRegistros < 0
  ) {
    throw new Error("O limite de registros é inválido.");
  }

  const limiteLinhas =
    limiteRegistros > 0
      ? limiteRegistros + 1
      : 0;

  const linhas = separarCSV(
    conteudo,
    limiteLinhas
  );

  if (linhas.length < 2) {
    throw new Error(
      "O arquivo CSV não possui cabeçalho e registros suficientes."
    );
  }

  const colunas = linhas[0].map(
    (coluna) =>
      coluna.replace(/^\uFEFF/, "").trim()
  );

  if (colunas.some((coluna) => coluna === "")) {
    throw new Error(
      "O cabeçalho do CSV possui uma coluna sem identificação."
    );
  }

  if (new Set(colunas).size !== colunas.length) {
    throw new Error(
      "O cabeçalho do CSV possui nomes de colunas duplicados."
    );
  }

  const linhasDados = linhas.slice(1);
  const registros: RegistroTSE[] = [];

  for (let indice = 0; indice < linhasDados.length; indice++) {
    const valores = linhasDados[indice];

    if (valores.length !== colunas.length) {
      throw new Error(
        `Inconsistência na linha ${indice + 2}: ` +
        `esperadas ${colunas.length} colunas, ` +
        `encontradas ${valores.length}.`
      );
    }

    const registro: RegistroTSE = {};

    for (let coluna = 0; coluna < colunas.length; coluna++) {
      registro[colunas[coluna]] =
        normalizarValor(valores[coluna]);
    }

    registros.push(registro);
  }

  return {
    sucesso: true,
    quantidadeRegistros: registros.length,
    quantidadeColunas: colunas.length,
    colunas,
    registros,
  };
}

export function lerArquivoCSVdoTSE(
  arquivo: Uint8Array,
  limiteRegistros = 0
): ResultadoLeituraTSE {
  const conteudo = decodificarCSVTSE(arquivo);

  return lerCSVdoTSE(
    conteudo,
    limiteRegistros
  );
}
