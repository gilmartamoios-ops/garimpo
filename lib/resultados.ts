
export type TipoRegistro =
  | "pessoa"
  | "profissional"
  | "empresa"
  | "organizacao"
  | "tema"
  | "outro";

export type TipoFonte =
  | "site"
  | "rede_social"
  | "base_publica"
  | "documento"
  | "noticia"
  | "api"
  | "outro";

export type NivelCorrespondencia =
  | "confirmada"
  | "provavel"
  | "possivel"
  | "nao_verificada";

export type FonteResultado = {
  id: string;
  nome: string;
  tipo: TipoFonte;
  url?: string;
  dataPublicacao?: string;
  dataConsulta: string;
  referencia?: string;
};

export type EvidenciaResultado = {
  id: string;
  descricao: string;
  trecho?: string;
  fonteId: string;
  dataReferencia?: string;
  relevancia?: number;
};

export type EventoHistorico = {
  id: string;
  titulo: string;
  descricao: string;
  data?: string;
  fonteId?: string;
  evidenciaId?: string;
};

export type PerfilInteligente = {
  resumo: string;
  areasRelacionadas: string[];
  caracteristicas: string[];
  conexoes: string[];
  observacoes: string[];
  atualizadoEm: string;
};

export type ResultadoPesquisa = {
  id: string;
  tipo: TipoRegistro;
  titulo: string;
  descricao: string;
  localizacao?: string;

  correspondencia: NivelCorrespondencia;
  justificativaCorrespondencia?: string;

  fontes: FonteResultado[];
  evidencias: EvidenciaResultado[];
  historico: EventoHistorico[];

  perfilInteligente?: PerfilInteligente;

  ambienteId: string;
  consultaId?: string;

  encontradoEm: string;
};

export type PesquisaExecutada = {
  id: string;
  ambienteId: string;
  consulta: string;
  status:
    | "pendente"
    | "executando"
    | "concluida"
    | "parcial"
    | "sem_resultados"
    | "erro";

  quantidadeResultados: number;
  fontesConsultadas: string[];
  iniciadaEm: string;
  concluidaEm?: string;
  mensagem?: string;
  resultados: ResultadoPesquisa[];
};

export function validarResultado(
  resultado: ResultadoPesquisa
): boolean {
  return (
    resultado.id.trim() !== "" &&
    resultado.titulo.trim() !== "" &&
    resultado.ambienteId.trim() !== "" &&
    resultado.fontes.length > 0 &&
    resultado.fontes.every(
      (fonte) =>
        fonte.id.trim() !== "" &&
        fonte.nome.trim() !== "" &&
        fonte.dataConsulta.trim() !== ""
    )
  );
}

export function validarResultados(
  resultados: ResultadoPesquisa[]
): ResultadoPesquisa[] {
  return resultados.filter(validarResultado);
}

