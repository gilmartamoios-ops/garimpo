import "server-only";

const API_IBGE =
  "https://servicodados.ibge.gov.br/api/v1/localidades";

export type EstadoIBGE = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export type MunicipioIBGE = {
  id: number;
  nome: string;
  microrregiao?: {
    id: number;
    nome: string;
  };
};

async function consultarIBGE<T>(url: string): Promise<T> {
  const resposta = await fetch(url, {
    next: {
      revalidate: 86400,
    },
  });

  if (!resposta.ok) {
    throw new Error(
      `O IBGE retornou um erro na consulta: ${resposta.status}`
    );
  }

  return resposta.json() as Promise<T>;
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Consulta os estados brasileiros na API oficial do IBGE.
 */
export async function buscarEstados(): Promise<EstadoIBGE[]> {
  return consultarIBGE<EstadoIBGE[]>(
    `${API_IBGE}/estados?orderBy=nome`
  );
}

/**
 * Consulta os municípios de um estado.
 * O identificador deve ser o código numérico do IBGE.
 */
export async function buscarMunicipiosPorEstado(
  estadoId: number
): Promise<MunicipioIBGE[]> {
  if (!Number.isInteger(estadoId) || estadoId <= 0) {
    throw new Error("Identificador de estado inválido.");
  }

  return consultarIBGE<MunicipioIBGE[]>(
    `${API_IBGE}/estados/${estadoId}/municipios?orderBy=nome`
  );
}

/**
 * Pesquisa municípios pelo nome.
 * A consulta utiliza a lista oficial de municípios do IBGE.
 */
export async function buscarMunicipiosPorNome(
  nome: string,
  limite = 20
): Promise<MunicipioIBGE[]> {
  const termo = normalizarTexto(nome);

  if (!termo) {
    return [];
  }

  const quantidade = Math.min(
    100,
    Math.max(1, Math.floor(limite))
  );

  const municipios = await consultarIBGE<MunicipioIBGE[]>(
    `${API_IBGE}/municipios?orderBy=nome`
  );

  return municipios
    .filter((municipio) =>
      normalizarTexto(municipio.nome).includes(termo)
    )
    .slice(0, quantidade);
}
