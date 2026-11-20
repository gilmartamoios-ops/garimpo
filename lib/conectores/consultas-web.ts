
export type SolicitacaoDescobertaWeb = {
  ambienteId: string;
  consulta: string;
  filtros?: Record<string, string | string[]>;
};

export type ConsultaWebGerada = {
  id: string;
  fonte: string;
  objetivo: string;
  consulta: string;
  url: string;
};

function obterValores(
  filtros: Record<string, string | string[]>
): string[] {
  return Object.entries(filtros)
    .flatMap(([chave, valor]) => {
      if (chave === "localizacao") return [];
      return Array.isArray(valor) ? valor : [valor];
    })
    .map((valor) => valor.trim())
    .filter(Boolean);
}

function obterLocalizacao(
  filtros: Record<string, string | string[]>
): string {
  const valor = filtros.localizacao;

  if (Array.isArray(valor)) return valor.join(" ").trim();

  return valor?.trim() ?? "";
}

function criarConsulta(
  id: string,
  fonte: string,
  objetivo: string,
  termos: string,
  urlPersonalizada?: string
): ConsultaWebGerada {
  return {
    id,
    fonte,
    objetivo,
    consulta: termos,
    url:
      urlPersonalizada ??
      `https://www.google.com/search?q=${encodeURIComponent(termos)}`,
  };
}

export function montarConsultasWeb(
  solicitacao: SolicitacaoDescobertaWeb
): ConsultaWebGerada[] {
  const consultaOriginal = solicitacao.consulta.trim();
  const filtros = solicitacao.filtros ?? {};
  const valores = obterValores(filtros);
  const localizacao = obterLocalizacao(filtros);

  const termosBase = [
    consultaOriginal,
    ...valores,
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 350);

  if (!termosBase && !localizacao) {
    throw new Error(
      "Informe uma descrição ou filtros para gerar as consultas."
    );
  }

  const termosComLocalizacao = [
    termosBase,
    localizacao,
  ]
    .filter(Boolean)
    .join(" ");

  const consultas: ConsultaWebGerada[] = [];

  function adicionar(
    id: string,
    fonte: string,
    objetivo: string,
    termos: string,
    urlPersonalizada?: string
  ) {
    consultas.push(
      criarConsulta(
        id,
        fonte,
        objetivo,
        termos.trim(),
        urlPersonalizada
      )
    );
  }

  adicionar(
    "google-geral",
    "Google",
    "Descoberta geral de páginas e informações públicas",
    termosComLocalizacao
  );

  switch (solicitacao.ambienteId) {
    case "pessoas": {
      adicionar(
        "google-linkedin",
        "Google · LinkedIn",
        "Encontrar perfis profissionais públicos",
        `site:linkedin.com/in ${termosComLocalizacao}`
      );

      adicionar(
        "google-instagram",
        "Google · Instagram",
        "Encontrar perfis públicos relacionados à atividade pesquisada",
        `site:instagram.com ${termosComLocalizacao}`
      );

      adicionar(
        "google-facebook",
        "Google · Facebook",
        "Encontrar páginas e perfis públicos",
        `site:facebook.com ${termosComLocalizacao}`
      );

      break;
    }

    case "profissionais": {
      adicionar(
        "google-curriculos",
        "Google · Currículos",
        "Encontrar currículos, portfólios e apresentações profissionais públicas",
        `${termosComLocalizacao} (currículo OR CV OR portfólio OR experiência profissional)`
      );

      adicionar(
        "google-linkedin",
        "Google · LinkedIn",
        "Encontrar perfis e trajetórias profissionais",
        `site:linkedin.com/in ${termosComLocalizacao}`
      );

      adicionar(
        "google-portfolios",
        "Google · Portfólios",
        "Encontrar páginas profissionais e trabalhos publicados",
        `${termosComLocalizacao} (portfólio OR trabalhos OR serviços profissionais)`
      );

      break;
    }

    case "empresas": {
      const consultaMaps =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          termosComLocalizacao
        )}`;

      adicionar(
        "google-mapas",
        "Google Maps",
        "Localizar empresas e estabelecimentos na região",
        termosComLocalizacao,
        consultaMaps
      );

      adicionar(
        "google-contatos",
        "Google · Contatos comerciais",
        "Encontrar sites e canais comerciais publicados",
        `${termosComLocalizacao} (WhatsApp OR telefone OR contato OR "fale conosco")`
      );

      adicionar(
        "google-instagram",
        "Google · Instagram",
        "Encontrar perfis comerciais públicos",
        `site:instagram.com ${termosComLocalizacao} (loja OR empresa OR negócio)`
      );

      adicionar(
        "google-facebook",
        "Google · Facebook",
        "Encontrar páginas comerciais públicas",
        `site:facebook.com ${termosComLocalizacao} (empresa OR comércio OR serviços)`
      );

      break;
    }

    case "organizacoes": {
      adicionar(
        "google-associacoes",
        "Google · Associações",
        "Encontrar associações, entidades e organizações",
        `${termosComLocalizacao} (associação OR entidade OR organização OR comunidade)`
      );

      adicionar(
        "google-liderancas",
        "Google · Lideranças",
        "Encontrar informações públicas sobre representantes e dirigentes",
        `${termosComLocalizacao} (presidente OR dirigente OR coordenador OR liderança)`
      );

      adicionar(
        "google-contatos",
        "Google · Contatos institucionais",
        "Encontrar páginas e canais institucionais publicados",
        `${termosComLocalizacao} (contato OR telefone OR WhatsApp OR endereço)`
      );

      break;
    }

    case "temas": {
      adicionar(
        "google-noticias",
        "Google · Notícias",
        "Encontrar notícias e publicações relacionadas",
        `${termosComLocalizacao} (notícias OR reportagem OR publicação)`
      );

      adicionar(
        "google-documentos",
        "Google · Documentos",
        "Encontrar estudos, documentos e materiais públicos",
        `${termosComLocalizacao} (estudo OR relatório OR pesquisa OR documento)`
      );

      break;
    }

    default:
      break;
  }

  return consultas;
}
