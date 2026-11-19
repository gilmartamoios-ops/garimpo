
import "server-only";

const API_BLUESKY =
  "https://api.bsky.app/xrpc";

export type PublicacaoBluesky = {
  uri: string;
  texto: string;
  publicadaEm: string;
  autor: {
    nome: string;
    identificador: string;
    perfil: string;
    avatar?: string;
  };
  endereco: string;
  metricas: {
    curtidas: number;
    compartilhamentos: number;
    respostas: number;
  };
};

type RespostaBluesky = {
  posts?: Array<{
    uri: string;
    author: {
      handle: string;
      displayName?: string;
      avatar?: string;
    };
    record: {
      text?: string;
      createdAt?: string;
    };
    likeCount?: number;
    repostCount?: number;
    replyCount?: number;
  }>;
  cursor?: string;
};

function limitarQuantidade(valor: number): number {
  if (!Number.isFinite(valor)) {
    return 20;
  }

  return Math.min(100, Math.max(1, Math.floor(valor)));
}

export async function buscarPublicacoesBluesky(
  consulta: string,
  limite = 20
): Promise<PublicacaoBluesky[]> {
  const termo = consulta.trim();

  if (termo.length < 2) {
    throw new Error(
      "Informe pelo menos dois caracteres para pesquisar no Bluesky."
    );
  }

  const quantidade = limitarQuantidade(limite);

  const parametros = new URLSearchParams({
    q: termo,
    limit: String(quantidade),
    sort: "latest",
  });

  const resposta = await fetch(
    `${API_BLUESKY}/app.bsky.feed.searchPosts?${parametros.toString()}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      `O Bluesky retornou um erro na consulta: ${resposta.status}`
    );
  }

  const dados =
    (await resposta.json()) as RespostaBluesky;

  return (dados.posts ?? []).map((publicacao) => {
    const identificadorPublicacao =
      publicacao.uri.split("/").pop() ?? "";

    const identificadorAutor =
      publicacao.author.handle;

    return {
      uri: publicacao.uri,
      texto: publicacao.record.text ?? "",
      publicadaEm:
        publicacao.record.createdAt ?? "",
      autor: {
        nome:
          publicacao.author.displayName ??
          identificadorAutor,
        identificador: identificadorAutor,
        perfil: `https://bsky.app/profile/${identificadorAutor}`,
        avatar: publicacao.author.avatar,
      },
      endereco:
        `https://bsky.app/profile/${identificadorAutor}/post/${identificadorPublicacao}`,
      metricas: {
        curtidas: publicacao.likeCount ?? 0,
        compartilhamentos:
          publicacao.repostCount ?? 0,
        respostas: publicacao.replyCount ?? 0,
      },
    };
  });
}
