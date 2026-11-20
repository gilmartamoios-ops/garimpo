
export type TipoRegistro =
  | "pessoa"
  | "consumidor"
  | "profissional"
  | "profissional_vendas_diretas"
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

export type ClassificacaoPessoa =
  | "consumidor"
  | "profissional_em_atividade"
  | "potencial_profissional"
  | "nao_classificado";

export type StatusVerificacaoPerfil =
  | "nao_verificado"
  | "link_encontrado"
  | "acessivel"
  | "indisponivel";

export type TipoContato =
  | "whatsapp"
  | "telefone"
  | "email"
  | "outro";

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

export type ContatoResultado = {
  tipo: TipoContato;
  valor: string;
  url?: string;
  fonteId: string;
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

  // Identificação do perfil individual
  perfilUrl?: string;
  plataforma?: string;
  statusVerificacaoPerfil?: StatusVerificacaoPerfil;
  verificadoEm?: string;

  // Classificação dentro do GArimpo Vendas Diretas
  classificacaoPessoa?: ClassificacaoPessoa;

  // Canais de contato encontrados publicamente
  contatos?: ContatoResultado[];

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

function urlValida(valor?: string): boolean {
  if (!valor) return false;

  try {
    const url = new URL(valor);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function dataValida(valor?: string): boolean {
  if (!valor) return false;

  return !Number.isNaN(Date.parse(valor));
}

export function validarResultado(
  resultado: ResultadoPesquisa
): boolean {
  if (
    !resultado.id?.trim() ||
    !resultado.titulo?.trim() ||
    !resultado.ambienteId?.trim() ||
    !resultado.fontes?.length ||
    !resultado.evidencias?.length ||
    !urlValida(resultado.perfilUrl)
  ) {
    return false;
  }

  // O perfil precisa estar associado a uma fonte identificável.
  const fontesValidas = resultado.fontes.every(
    (fonte) =>
      fonte.id?.trim() !== "" &&
      fonte.nome?.trim() !== "" &&
      dataValida(fonte.dataConsulta) &&
      urlValida(fonte.url)
  );

  if (!fontesValidas) return false;

  const idsFontes = new Set(
    resultado.fontes.map((fonte) => fonte.id)
  );

  // Toda evidência precisa apontar para uma fonte existente.
  const evidenciasValidas = resultado.evidencias.every(
    (evidencia) =>
      evidencia.id?.trim() !== "" &&
      evidencia.descricao?.trim() !== "" &&
      idsFontes.has(evidencia.fonteId)
  );

  if (!evidenciasValidas) return false;

  // Todo contato informado precisa ter uma fonte identificada.
  const contatosValidos = (resultado.contatos ?? []).every(
    (contato) =>
      contato.valor?.trim() !== "" &&
      idsFontes.has(contato.fonteId) &&
      (!contato.url || urlValida(contato.url))
  );

  if (!contatosValidos) return false;

  // Eventos históricos precisam apontar para fontes existentes.
  const historicoValido = resultado.historico.every(
    (evento) =>
      !evento.fonteId || idsFontes.has(evento.fonteId)
  );

  if (!historicoValido) return false;

  return true;
}

export function validarResultados(
  resultados: ResultadoPesquisa[]
): ResultadoPesquisa[] {
  return resultados.filter(validarResultado);
}
