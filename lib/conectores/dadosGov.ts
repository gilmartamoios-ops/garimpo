
import "server-only";

const API_DADOS_GOV =
  "https://dados.gov.br/dados/api/publico/conjuntos-dados";

export type ConjuntoDadosPublico = Record<
  string,
  unknown
>;

export type ConsultaDadosGov = {
  resultados: ConjuntoDadosPublico[];
  quantidade: number;
  consulta: string;
  pagina: number;
};

export async function buscarConjuntosDados(
  consulta = "",
  pagina = 1
): Promise<ConsultaDadosGov> {
  const termo = consulta.trim();

  if (!Number.isInteger(pagina) || pagina < 1) {
    throw new Error("Número de página inválido.");
  }

  const parametros = new URLSearchParams({
    pagina: String(pagina),
    dadosAbertos: "true",
    isPrivado: "false",
  });

  if (termo) {
    parametros.set("nomeConjuntoDados", termo);
  }

  const resposta = await fetch(
    `${API_DADOS_GOV}?${parametros.toString()}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `O Dados.gov.br retornou um erro na consulta: ${resposta.status}`
    );
  }

  const dados: unknown = await resposta.json();

  if (!Array.isArray(dados)) {
    throw new Error(
      "O Dados.gov.br retornou um formato de resposta inesperado."
    );
  }

  return {
    resultados: dados as ConjuntoDadosPublico[],
    quantidade: dados.length,
    consulta: termo,
    pagina,
  };
}
