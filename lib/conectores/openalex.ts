
import "server-only";

const API_OPENALEX = "https://api.openalex.org";

export type AutorOpenAlex = {
  id: string;
  nome: string;
  orcid?: string;
  quantidadePublicacoes: number;
  quantidadeCitacoes: number;
  instituicoes: string[];
  endereco: string;
};

type RespostaOpenAlex = {
  meta?: {
    count?: number;
  };
  results?: Array<{
    id: string;
    display_name?: string;
    orcid?: string | null;
    works_count?: number;
    cited_by_count?: number;
    last_known_institutions?: Array<{
      display_name?: string;
    }>;
  }>;
};

export async function buscarAutoresOpenAlex(
  consulta: string,
  limite = 10
): Promise<{
  consulta: string;
  quantidadeTotal: number;
  resultados: AutorOpenAlex[];
}> {
  const termo = consulta.trim();

  if (termo.length < 2) {
    throw new Error(
      "Informe pelo menos dois caracteres para pesquisar."
    );
  }

  const quantidade = Number.isFinite(limite)
    ? Math.min(25, Math.max(1, Math.floor(limite)))
    : 10;

  const parametros = new URLSearchParams({
    search: termo,
    per_page: String(quantidade),
    select:
      "id,display_name,orcid,works_count,cited_by_count,last_known_institutions",
  });

  const chave = process.env.OPENALEX_API_KEY;

  if (chave) {
    parametros.set("api_key", chave);
  }

  const resposta = await fetch(
    `${API_OPENALEX}/authors?${parametros.toString()}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `O OpenAlex retornou um erro na consulta: ${resposta.status}`
    );
  }

  const dados =
    (await resposta.json()) as RespostaOpenAlex;

  const resultados = (dados.results ?? []).map(
    (autor): AutorOpenAlex => ({
      id: autor.id,
      nome: autor.display_name ?? "Nome não informado",
      orcid: autor.orcid ?? undefined,
      quantidadePublicacoes: autor.works_count ?? 0,
      quantidadeCitacoes: autor.cited_by_count ?? 0,
      instituicoes:
        (autor.last_known_institutions ?? [])
          .map((instituicao) => instituicao.display_name ?? "")
          .filter(Boolean),
      endereco: autor.id,
    })
  );

  return {
    consulta: termo,
    quantidadeTotal: dados.meta?.count ?? resultados.length,
    resultados,
  };
}
