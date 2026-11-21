
export type CategoriaFonte =
  | "dados_publicos"
  | "institucional"
  | "academica"
  | "rede_social"
  | "busca_web";

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

const AMBIENTES_COMERCIAIS = [
  "pessoas",
  "profissionais",
];

export const fontes: FonteInformacao[] = [
  {
    id: "google",
    nome: "Google Pesquisa",
    descricao:
      "Pesquisa na web para localizar páginas públicas, perfis individuais, publicações e manifestações relacionadas a produtos e vendas diretas.",
    categoria: "busca_web",
    formaAcesso: "consulta_web",
    status: "catalogada",
    url: "https://www.google.com/",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "A pesquisa pode localizar páginas indexadas, mas não garante a existência, a acessibilidade ou a identidade do perfil. A coleta e a validação serão etapas próprias do GArimpo.",
  },
  {
    id: "instagram",
    nome: "Instagram",
    descricao:
      "Perfis e publicações públicas que possam apresentar atividade comercial, divulgação de produtos, recomendações ou interesse em vendas diretas.",
    categoria: "rede_social",
    formaAcesso: "consulta_web",
    status: "requer_validacao",
    url: "https://www.instagram.com/",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "A pesquisa por páginas indexadas não equivale a uma API de consulta irrestrita. Respeitar as condições de acesso e uso da plataforma.",
  },
  {
    id: "facebook",
    nome: "Facebook",
    descricao:
      "Páginas, perfis, publicações e comunidades públicas relacionadas a consumo, recomendações e atividade comercial.",
    categoria: "rede_social",
    formaAcesso: "consulta_web",
    status: "requer_validacao",
    url: "https://www.facebook.com/",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "A disponibilidade de conteúdo depende da visibilidade pública, indexação e permissões da plataforma. Não representa acesso irrestrito aos dados.",
  },
  {
    id: "tiktok",
    nome: "TikTok",
    descricao:
      "Perfis e vídeos públicos com demonstrações de produtos, recomendações, divulgação comercial e manifestações de interesse em vendas.",
    categoria: "rede_social",
    formaAcesso: "consulta_web",
    status: "requer_validacao",
    url: "https://www.tiktok.com/",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "A pesquisa por conteúdo público depende da disponibilidade e indexação. Não presumir acesso a dados privados ou a todos os perfis.",
  },
  {
    id: "youtube",
    nome: "YouTube",
    descricao:
      "Canais e vídeos públicos sobre produtos, demonstrações, recomendações e atividade comercial.",
    categoria: "rede_social",
    formaAcesso: "api_com_chave",
    status: "requer_validacao",
    url: "https://developers.google.com/youtube/data",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "A API exige configuração de projeto e possui cotas. A disponibilidade de dados de canais e vídeos depende dos recursos autorizados.",
  },
  {
    id: "bluesky",
    nome: "Bluesky",
    descricao:
      "Perfis e publicações públicas que possam apresentar interesses de consumo ou atividade profissional.",
    categoria: "rede_social",
    formaAcesso: "api_publica",
    status: "requer_validacao",
    url: "https://docs.bsky.app/",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "Acesso público disponível em endpoints compatíveis. Validar limites, disponibilidade e condições de uso antes da integração.",
  },
  {
    id: "mastodon",
    nome: "Mastodon",
    descricao:
      "Perfis e publicações públicas de instâncias que possam conter informações relacionadas aos ambientes comerciais.",
    categoria: "rede_social",
    formaAcesso: "acesso_condicional",
    status: "requer_validacao",
    url: "https://docs.joinmastodon.org/",
    ambientes: AMBIENTES_COMERCIAIS,
    gratuita: true,
    observacoes:
      "A disponibilidade depende das configurações, políticas e permissões de cada instância.",
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
