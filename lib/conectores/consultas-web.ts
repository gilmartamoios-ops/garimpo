
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

function obterFiltro(
  filtros: Record<string, string | string[]>,
  chaves: string[]
): string[] {
  return chaves
    .flatMap((chave) => {
      const valor = filtros[chave];

      if (Array.isArray(valor)) return valor;

      return valor ? [valor] : [];
    })
    .map((valor) => valor.trim())
    .filter(Boolean);
}

function obterLocalizacao(
  filtros: Record<string, string | string[]>
): string {
  const valor = filtros.localizacao;

  if (Array.isArray(valor)) {
    return valor.map((item) => item.trim()).filter(Boolean).join(" ");
  }

  return valor?.trim() ?? "";
}

function limitarConsulta(termos: string): string {
  return termos.trim().slice(0, 500);
}

function criarConsulta(
  id: string,
  fonte: string,
  objetivo: string,
  termos: string,
  urlPersonalizada?: string
): ConsultaWebGerada {
  const consulta = limitarConsulta(termos);

  return {
    id,
    fonte,
    objetivo,
    consulta,
    url:
      urlPersonalizada ??
      `https://www.google.com/search?q=${encodeURIComponent(consulta)}`,
  };
}

export function montarConsultasWeb(
  solicitacao: SolicitacaoDescobertaWeb
): ConsultaWebGerada[] {
  const consultaOriginal = solicitacao.consulta.trim();
  const filtros = solicitacao.filtros ?? {};
  const localizacao = obterLocalizacao(filtros);

  const consultas: ConsultaWebGerada[] = [];

  function adicionar(
    id: string,
    fonte: string,
    objetivo: string,
    termos: string
  ) {
    const consulta = limitarConsulta(termos);

    if (!consulta) return;

    consultas.push(
      criarConsulta(id, fonte, objetivo, consulta)
    );
  }

  function montarTermos(
    chaves: string[],
    incluirConsulta = true
  ): string {
    return [
      ...(incluirConsulta && consultaOriginal
        ? [consultaOriginal]
        : []),
      ...obterFiltro(filtros, chaves),
      localizacao,
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (!consultaOriginal && Object.keys(filtros).length === 0) {
    throw new Error(
      "Informe uma descrição ou filtros para gerar as consultas."
    );
  }

  switch (solicitacao.ambienteId) {
    case "pessoas": {
      const termosBase = montarTermos([
        "marcas",
        "categoriasProdutos",
        "interesseCompra",
        "recomendacoesAvaliacoes",
        "relacionamentoConsultoras",
        "interesseRevenda",
        "recencia",
      ]);

      const termosInteresse = montarTermos([
        "marcas",
        "categoriasProdutos",
        "interesseCompra",
        "recomendacoesAvaliacoes",
        "relacionamentoConsultoras",
        "interesseRevenda",
      ]);

      adicionar(
        "consumidores-geral",
        "Google",
        "Localizar manifestações públicas de interesse em produtos e recomendações",
        termosBase
      );

      adicionar(
        "consumidores-instagram",
        "Google · Instagram",
        "Encontrar publicações e perfis públicos relacionados ao interesse em produtos",
        `site:instagram.com ${termosInteresse} (comprar OR procurando OR indicação OR recomendação OR avaliação)`
      );

      adicionar(
        "consumidores-facebook",
        "Google · Facebook",
        "Encontrar perfis, publicações e participações públicas relacionadas a produtos",
        `site:facebook.com ${termosInteresse} (comprar OR procurando OR indicação OR recomendação OR revenda)`
      );

      adicionar(
        "consumidores-tiktok",
        "Google · TikTok",
        "Encontrar perfis e publicações públicas sobre produtos e recomendações",
        `site:tiktok.com ${termosInteresse} (resenha OR indicação OR recomendação OR comprando)`
      );

      adicionar(
        "consumidores-publicacoes",
        "Google · Publicações públicas",
        "Encontrar manifestações individuais em páginas, fóruns e comunidades públicas",
        `${termosInteresse} ("alguém indica" OR "onde comprar" OR "qual você recomenda" OR "estou procurando")`
      );

      break;
    }

    case "profissionais": {
      const termosBase = montarTermos([
        "marcas",
        "tipoAtuacao",
        "situacaoProfissional",
        "experiencia",
        "atividadeComercial",
        "interesseIniciar",
        "liderancaEquipes",
        "recencia",
      ]);

      const termosAtividade = montarTermos([
        "marcas",
        "tipoAtuacao",
        "experiencia",
        "atividadeComercial",
      ]);

      const termosInteresse = montarTermos([
        "marcas",
        "tipoAtuacao",
        "interesseIniciar",
      ]);

      adicionar(
        "profissionais-geral",
        "Google",
        "Localizar profissionais e manifestações públicas de interesse em vendas diretas",
        termosBase
      );

      adicionar(
        "profissionais-instagram",
        "Google · Instagram",
        "Encontrar perfis individuais com divulgação pública de produtos e atividade comercial",
        `site:instagram.com ${termosAtividade} (consultora OR revendedora OR catálogo OR pedidos OR encomendas)`
      );

      adicionar(
        "profissionais-facebook",
        "Google · Facebook",
        "Encontrar perfis e páginas pessoais com atividade pública de vendas diretas",
        `site:facebook.com ${termosAtividade} (consultora OR revendedora OR catálogo OR vendo OR encomendas)`
      );

      adicionar(
        "profissionais-tiktok",
        "Google · TikTok",
        "Encontrar perfis e publicações de pessoas que divulgam produtos e vendas",
        `site:tiktok.com ${termosAtividade} (consultora OR revendedora OR vendas OR catálogo)`
      );

      adicionar(
        "profissionais-catalogos",
        "Google · Catálogos e vitrines",
        "Encontrar catálogos, vitrines e páginas individuais de consultoras e revendedoras",
        `${termosAtividade} (meu catálogo OR faça seu pedido OR consulte meu catálogo OR consultora independente)`
      );

      adicionar(
        "profissionais-interessados",
        "Google · Interesse profissional",
        "Encontrar manifestações públicas de pessoas interessadas em iniciar uma atividade comercial",
        `${termosInteresse} ("quero começar" OR "como ser consultora" OR "como revender" OR "renda extra" OR "meu próprio negócio")`
      );

      adicionar(
        "profissionais-lideranca",
        "Google · Liderança comercial",
        "Encontrar perfis com evidências públicas de orientação e formação de equipes de vendas diretas",
        `${termosBase} (líder de equipe OR treinamento de consultoras OR equipe de revendedoras)`
      );

      break;
    }

    default: {
      const termos = [
        consultaOriginal,
        ...Object.values(filtros).flatMap((valor) =>
          Array.isArray(valor) ? valor : [valor]
        ),
        localizacao,
      ]
        .filter(Boolean)
        .join(" ");

      adicionar(
        "google-geral",
        "Google",
        "Pesquisa geral de informações públicas",
        termos
      );
    }
  }

  return consultas;
}
