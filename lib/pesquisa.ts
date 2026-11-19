
import { buscarAmbiente } from "./ambientes";

export type {
  ResultadoPesquisa,
} from "./resultados";

export {
  validarResultados,
} from "./resultados";

export type SolicitacaoPesquisa = {
  ambienteId: string;
  consulta: string;
  filtros?: Record<string, string | string[]>;
};

export type PesquisaOrganizada = {
  id: string;
  ambienteId: string;
  ambienteNome: string;
  consultaOriginal: string;
  consultaNormalizada: string;
  filtros: Record<string, string | string[]>;
  status: "preparada";
  criadaEm: string;
};

export function prepararPesquisa(
  solicitacao: SolicitacaoPesquisa
): PesquisaOrganizada {
  const ambiente = buscarAmbiente(solicitacao.ambienteId);

  if (!ambiente || !ambiente.ativo) {
    throw new Error("Ambiente de pesquisa não encontrado ou inativo.");
  }

  const consulta = solicitacao.consulta.trim();

  const filtros = Object.fromEntries(
    Object.entries(solicitacao.filtros ?? {})
      .map(([chave, valor]) => {
        if (Array.isArray(valor)) {
          return [
            chave,
            valor.map((item) => item.trim()).filter(Boolean),
          ];
        }

        return [chave, valor.trim()];
      })
      .filter(([, valor]) =>
        Array.isArray(valor) ? valor.length > 0 : valor !== ""
      )
  ) as Record<string, string | string[]>;

  const possuiFiltros = Object.keys(filtros).length > 0;

  if (!consulta && !possuiFiltros) {
    throw new Error(
      "Informe uma descrição ou preencha pelo menos um filtro."
    );
  }

  return {
    id: crypto.randomUUID(),
    ambienteId: ambiente.id,
    ambienteNome: ambiente.nome,
    consultaOriginal: consulta,
    consultaNormalizada: consulta
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
    filtros,
    status: "preparada",
    criadaEm: new Date().toISOString(),
  };
}
