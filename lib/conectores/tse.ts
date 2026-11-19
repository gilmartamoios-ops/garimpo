
import "server-only";

const API_TSE =
  "https://dadosabertos.tse.jus.br/api/3/action";

export type RecursoTSE = {
  id: string;
  nome: string;
  formato: string;
  endereco: string;
  descricao: string;
  tamanho?: number;
  atualizadoEm?: string;
};

export type ConjuntoDadosTSE = {
  id: string;
  nome: string;
  titulo: string;
  descricao: string;
  atualizadoEm: string;
  endereco: string;
  recursos: RecursoTSE[];
};

type RecursoCKAN = {
  id: string;
  name?: string;
  format?: string;
  url: string;
  description?: string;
  size?: number;
  last_modified?: string;
};

type ConjuntoCKAN = {
  id: string;
  name: string;
  title?: string;
  notes?: string;
  metadata_modified?: string;
  url?: string;
  resources?: RecursoCKAN[];
};

type RespostaCKAN = {
  success: boolean;
  result?: {
    count?: number;
    results?: ConjuntoCKAN[];
  };
};

type RespostaDetalhesCKAN = {
  success: boolean;
  result?: ConjuntoCKAN;
};

function normalizarConjunto(
  conjunto: ConjuntoCKAN
): ConjuntoDadosTSE {
  return {
    id: conjunto.id,
    nome: conjunto.name,
    titulo: conjunto.title ?? conjunto.name,
    descricao: conjunto.notes ?? "",
    atualizadoEm: conjunto.metadata_modified ?? "",
    endereco:
      conjunto.url ??
      `https://dadosabertos.tse.jus.br/dataset/${conjunto.name}`,
    recursos: (conjunto.resources ?? []).map(
      (recurso) => ({
        id: recurso.id,
        nome: recurso.name ?? "Arquivo sem nome",
        formato: recurso.format ?? "Não informado",
        endereco: recurso.url,
        descricao: recurso.description ?? "",
        tamanho: recurso.size,
        atualizadoEm: recurso.last_modified,
      })
    ),
  };
}

export async function buscarConjuntosTSE(
  consulta: string,
  limite = 10,
  pagina = 1
): Promise<{
  consulta: string;
  quantidadeTotal: number;
  resultados: ConjuntoDadosTSE[];
}> {
  const termo = consulta.trim();

  if (termo.length < 2) {
    throw new Error(
      "Informe pelo menos dois caracteres para pesquisar no TSE."
    );
  }

  if (!Number.isInteger(pagina) || pagina < 1) {
    throw new Error("Número de página inválido.");
  }

  const quantidade = Number.isFinite(limite)
    ? Math.min(25, Math.max(1, Math.floor(limite)))
    : 10;

  const parametros = new URLSearchParams({
    q: termo,
    rows: String(quantidade),
    start: String((pagina - 1) * quantidade),
  });

  const resposta = await fetch(
    `${API_TSE}/package_search?${parametros.toString()}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `O TSE retornou um erro na consulta: ${resposta.status}`
    );
  }

  const dados = (await resposta.json()) as RespostaCKAN;

  if (!dados.success || !dados.result) {
    throw new Error(
      "O TSE retornou uma resposta inválida."
    );
  }

  const resultados = (
    dados.result.results ?? []
  ).map(normalizarConjunto);

  return {
    consulta: termo,
    quantidadeTotal:
      dados.result.count ?? resultados.length,
    resultados,
  };
}

export async function buscarDetalhesConjuntoTSE(
  identificador: string
): Promise<ConjuntoDadosTSE> {
  const id = identificador.trim();

  if (!id) {
    throw new Error(
      "Informe o identificador do conjunto de dados do TSE."
    );
  }

  const parametros = new URLSearchParams({
    id,
  });

  const resposta = await fetch(
    `${API_TSE}/package_show?${parametros.toString()}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `O TSE retornou um erro ao consultar o conjunto: ${resposta.status}`
    );
  }

  const dados =
    (await resposta.json()) as RespostaDetalhesCKAN;

  if (!dados.success || !dados.result) {
    throw new Error(
      "Não foi possível localizar os detalhes do conjunto no TSE."
    );
  }

  return normalizarConjunto(dados.result);
}
