
export type CategoriaFonte =
  | "dados_publicos"
  | "institucional"
  | "academica"
  | "rede_social";

export type FormaAcesso =
  | "api_publica"
  | "download"
  | "consulta_web"
  | "api_com_chave"
  | "acesso_condicional";

export type StatusFonte =
  | "catalogada"
  | "disponivel"
  | "requer_validacao"
  | "indisponivel";

export type FonteInformacao = {
  id: string;
  nome: string;
  descricao: string;
  categoria: CategoriaFonte;
  formaAcesso: FormaAcesso;
  status: StatusFonte;
  url: string;
  ambientes: string[];
  gratuita: boolean;
  observacoes?: string;
};

export const fontes: FonteInformacao[] = [
  {
    id: "dados-gov",
    nome: "Dados.gov.br",
    descricao: "Catálogo de conjuntos de dados públicos do governo brasileiro.",
    categoria: "dados_publicos",
    formaAcesso: "api_publica",
    status: "catalogada",
    url: "https://dados.gov.br/",
    ambientes: [
      "pessoas",
      "profissionais",
      "empresas",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "A API permite pesquisar conjuntos de dados e organizações. Cada conjunto deverá ter suas condições de uso verificadas.",
  },
  {
    id: "ibge",
    nome: "IBGE",
    descricao: "Dados estatísticos, territoriais, econômicos e populacionais.",
    categoria: "dados_publicos",
    formaAcesso: "api_publica",
    status: "catalogada",
    url: "https://servicodados.ibge.gov.br/api/docs/",
    ambientes: [
      "empresas",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "Fonte útil para contextualização territorial, econômica e demográfica.",
  },
  {
    id: "tse",
    nome: "Tribunal Superior Eleitoral",
    descricao: "Dados públicos eleitorais, candidaturas, partidos e eleições.",
    categoria: "institucional",
    formaAcesso: "download",
    status: "catalogada",
    url: "https://dadosabertos.tse.jus.br/",
    ambientes: [
      "pessoas",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "Utilizar somente informações públicas e observar a finalidade e as regras aplicáveis aos dados pessoais.",
  },
  {
    id: "receita-federal",
    nome: "Receita Federal",
    descricao: "Dados cadastrais públicos de empresas e estabelecimentos.",
    categoria: "dados_publicos",
    formaAcesso: "download",
    status: "catalogada",
    url: "https://www.gov.br/receitafederal/dados",
    ambientes: [
      "empresas",
      "organizacoes",
    ],
    gratuita: true,
    observacoes:
      "Os dados são disponibilizados em arquivos estruturados. A integração exigirá tratamento e atualização dos arquivos.",
  },
  {
    id: "openalex",
    nome: "OpenAlex",
    descricao: "Publicações científicas, autores, instituições e temas de pesquisa.",
    categoria: "academica",
    formaAcesso: "api_com_chave",
    status: "requer_validacao",
    url: "https://help.openalex.org/api/",
    ambientes: [
      "pessoas",
      "profissionais",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "A API oferece orçamento gratuito diário, mas exige chave de acesso conforme as regras atuais.",
  },
  {
    id: "youtube",
    nome: "YouTube",
    descricao: "Vídeos, canais e informações públicas de conteúdo.",
    categoria: "rede_social",
    formaAcesso: "api_com_chave",
    status: "requer_validacao",
    url: "https://developers.google.com/youtube/data",
    ambientes: [
      "pessoas",
      "profissionais",
      "empresas",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "A API possui cotas gratuitas limitadas e exige configuração de projeto no Google.",
  },
  {
    id: "bluesky",
    nome: "Bluesky",
    descricao: "Publicações e perfis disponibilizados pela rede social.",
    categoria: "rede_social",
    formaAcesso: "api_publica",
    status: "requer_validacao",
    url: "https://docs.bsky.app/",
    ambientes: [
      "pessoas",
      "profissionais",
      "empresas",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "Leituras públicas estão disponíveis sem autenticação em endpoints compatíveis. Respeitar limites e regras da plataforma.",
  },
  {
    id: "mastodon",
    nome: "Mastodon",
    descricao: "Publicações e perfis públicos de instâncias da rede.",
    categoria: "rede_social",
    formaAcesso: "acesso_condicional",
    status: "requer_validacao",
    url: "https://docs.joinmastodon.org/",
    ambientes: [
      "pessoas",
      "profissionais",
      "empresas",
      "organizacoes",
      "temas",
    ],
    gratuita: true,
    observacoes:
      "A disponibilidade depende das configurações e permissões de cada instância.",
  },
];

export function buscarFonte(
  id: string
): FonteInformacao | undefined {
  return fontes.find((fonte) => fonte.id === id);
}

export function listarFontesPorAmbiente(
  ambienteId: string
): FonteInformacao[] {
  return fontes.filter(
    (fonte) =>
      fonte.ambientes.includes(ambienteId) &&
      fonte.status !== "indisponivel"
  );
}

export function listarFontesDisponiveis(): FonteInformacao[] {
  return fontes.filter(
    (fonte) => fonte.status === "disponivel"
  );
}

