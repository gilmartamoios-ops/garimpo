
import { buscarAmbiente } from "./ambientes";

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

export type ResultadoPesquisa = {
  id: string;
  titulo: string;
  descricao: string;
  fonte: string;
  url?: string;
  relevancia?: number;
};

export function prepararPesquisa(
  solicitacao: SolicitacaoPesquisa
): PesquisaOrganizada {
  const ambiente = buscarAmbiente(solicitacao.ambienteId);

  if (!ambiente || !ambiente.ativo) {
    throw new Error("Ambiente de pesquisa não encontrado ou inativo.");
  }

  const consulta = solicitacao.consulta.trim();

  if (!consulta) {
    throw new Error("Informe o que deseja pesquisar.");
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
    filtros: solicitacao.filtros ?? {},
    status: "preparada",
    criadaEm: new Date().toISOString(),
  };
}

export function validarResultados(
  resultados: ResultadoPesquisa[]
): ResultadoPesquisa[] {
  return resultados.filter(
    (resultado) =>
      resultado.id.trim() !== "" &&
      resultado.titulo.trim() !== "" &&
      resultado.fonte.trim() !== ""
  );
}
