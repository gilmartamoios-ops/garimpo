
import "server-only";

const API_YOUTUBE = "https://www.googleapis.com/youtube/v3";

export type ComentarioYouTube = {
  id: string;
  texto: string;
  publicadaEm: string;
  autor: {
    nome: string;
    identificador: string;
    perfil: string;
  };
  curtidas: number;
};

export type PublicacaoYouTube = {
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
  comentarios: ComentarioYouTube[];
};

export type ResultadoGarimpoYouTube = {
  publicacoes: PublicacaoYouTube[];
  consultasExecutadas: string[];
  falhas: {
    consulta: string;
    erro: string;
  }[];
};

type RespostaErroYouTube = {
  error?: {
    message?: string;
    errors?: Array<{
      reason?: string;
    }>;
  };
};

type RespostaPesquisa = {
  items?: Array<{
    id?: {
      videoId?: string;
    };
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelId?: string;
      channelTitle?: string;
      thumbnails?: {
        default?: { url?: string };
        medium?: { url?: string };
        high?: { url?: string };
      };
    };
  }>;
};

type RespostaVideos = {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      channelId?: string;
      channelTitle?: string;
      thumbnails?: {
        default?: { url?: string };
        medium?: { url?: string };
        high?: { url?: string };
      };
    };
    statistics?: {
      viewCount?: string;
      likeCount?: string;
      commentCount?: string;
    };
  }>;
};

type RespostaComentarios = {
  items?: Array<{
    id: string;
    snippet?: {
      topLevelComment?: {
        id?: string;
        snippet?: {
          textDisplay?: string;
          authorDisplayName?: string;
          authorChannelId?: {
            value?: string;
          };
          publishedAt?: string;
          likeCount?: number;
        };
      };
    };
  }>;
};

function obterChaveAPI(): string {
  const chave = process.env.YOUTUBE_API_KEY?.trim();

  if (!chave) {
    throw new Error(
      "A chave YOUTUBE_API_KEY não está configurada."
    );
  }

  return chave;
}

async function consultarAPI<T>(
  endpoint: string,
  parametros: Record<string, string>
): Promise<T> {
  const url = new URL(`${API_YOUTUBE}/${endpoint}`);

  Object.entries({
    ...parametros,
    key: obterChaveAPI(),
  }).forEach(([nome, valor]) => {
    url.searchParams.set(nome, valor);
  });

  const resposta = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    const erro = dados as RespostaErroYouTube;

    throw new Error(
      erro.error?.message ||
        `Erro na API do YouTube: ${resposta.status}`
    );
  }

  return dados as T;
}

function limitarQuantidade(
  valor: number,
  padrao: number,
  maximo: number
): number {
  if (!Number.isFinite(valor)) {
    return padrao;
  }

  return Math.min(
    maximo,
    Math.max(1, Math.floor(valor))
  );
}

function converterVideo(
  video: NonNullable<RespostaVideos["items"]>[number]
): PublicacaoYouTube {
  const canalId = video.snippet?.channelId || "";
  const videoId = video.id;

  return {
    uri: `youtube:${videoId}`,
    texto: [
      video.snippet?.title || "",
      video.snippet?.description || "",
    ]
      .filter(Boolean)
      .join("\n\n"),
    publicadaEm: video.snippet?.publishedAt || "",
    autor: {
      nome: video.snippet?.channelTitle || "Canal do YouTube",
      identificador: canalId,
      perfil: canalId
        ? `https://www.youtube.com/channel/${canalId}`
        : "https://www.youtube.com/",
      avatar:
        video.snippet?.thumbnails?.high?.url ||
        video.snippet?.thumbnails?.medium?.url ||
        video.snippet?.thumbnails?.default?.url,
    },
    endereco: `https://www.youtube.com/watch?v=${videoId}`,
    metricas: {
      curtidas: Number(video.statistics?.likeCount || 0),
      compartilhamentos: 0,
      respostas: Number(video.statistics?.commentCount || 0),
    },
    comentarios: [],
  };
}

async function buscarComentarios(
  videoId: string,
  limite: number
): Promise<ComentarioYouTube[]> {
  try {
    const resposta =
      await consultarAPI<RespostaComentarios>(
        "commentThreads",
        {
          part: "snippet",
          videoId,
          maxResults: String(limite),
          order: "relevance",
          textFormat: "plainText",
        }
      );

    return (resposta.items || [])
      .map((item) => {
        const comentario =
          item.snippet?.topLevelComment;

        const dados = comentario?.snippet;

        if (!dados) {
          return null;
        }

        const canalId =
          dados.authorChannelId?.value || "";

        return {
          id: comentario?.id || item.id,
          texto: dados.textDisplay || "",
          publicadaEm: dados.publishedAt || "",
          autor: {
            nome:
              dados.authorDisplayName ||
              "Usuário do YouTube",
            identificador: canalId,
            perfil: canalId
              ? `https://www.youtube.com/channel/${canalId}`
              : "https://www.youtube.com/",
          },
          curtidas: Number(dados.likeCount || 0),
        };
      })
      .filter(
        (item): item is ComentarioYouTube =>
          item !== null && item.texto.trim().length > 0
      );
  } catch {
    // Comentários desativados ou indisponíveis
    // não impedem a entrega do vídeo.
    return [];
  }
}

export async function buscarPublicacoesYouTube(
  consulta: string,
  limite = 5,
  incluirComentarios = true,
  limiteComentarios = 10
): Promise<PublicacaoYouTube[]> {
  const termo = consulta.trim();

  if (termo.length < 2) {
    throw new Error(
      "Informe um termo válido para pesquisar no YouTube."
    );
  }

  const quantidade = limitarQuantidade(
    limite,
    5,
    50
  );

  const quantidadeComentarios = limitarQuantidade(
    limiteComentarios,
    10,
    20
  );

  const pesquisa =
    await consultarAPI<RespostaPesquisa>(
      "search",
      {
        part: "snippet",
        type: "video",
        q: termo,
        maxResults: String(quantidade),
        order: "relevance",
        relevanceLanguage: "pt",
        regionCode: "BR",
      }
    );

  const ids = (pesquisa.items || [])
    .map((item) => item.id?.videoId)
    .filter(
      (id): id is string =>
        typeof id === "string" && id.length > 0
    );

  if (ids.length === 0) {
    return [];
  }

  const detalhes =
    await consultarAPI<RespostaVideos>(
      "videos",
      {
        part: "snippet,statistics",
        id: ids.join(","),
      }
    );

  const publicacoes = (detalhes.items || [])
    .map(converterVideo);

  if (!incluirComentarios) {
    return publicacoes;
  }

  for (const publicacao of publicacoes) {
    const videoId = publicacao.uri.replace(
      "youtube:",
      ""
    );

    publicacao.comentarios = await buscarComentarios(
      videoId,
      quantidadeComentarios
    );
  }

  return publicacoes;
}

export async function buscarPublicacoesYouTubeEmLote(
  consultas: string[],
  limitePorConsulta = 5,
  incluirComentarios = true,
  limiteComentarios = 10
): Promise<ResultadoGarimpoYouTube> {
  const consultasUnicas = Array.from(
    new Set(
      consultas
        .map((consulta) => consulta.trim())
        .filter((consulta) => consulta.length >= 2)
    )
  ).slice(0, 10);

  const publicacoesMap = new Map<
    string,
    PublicacaoYouTube
  >();

  const consultasExecutadas: string[] = [];
  const falhas: ResultadoGarimpoYouTube["falhas"] = [];

  for (const consulta of consultasUnicas) {
    try {
      const publicacoes =
        await buscarPublicacoesYouTube(
          consulta,
          limitePorConsulta,
          incluirComentarios,
          limiteComentarios
        );

      consultasExecutadas.push(consulta);

      for (const publicacao of publicacoes) {
        if (!publicacoesMap.has(publicacao.uri)) {
          publicacoesMap.set(
            publicacao.uri,
            publicacao
          );
        }
      }
    } catch (erro) {
      falhas.push({
        consulta,
        erro:
          erro instanceof Error
            ? erro.message
            : "Falha na consulta ao YouTube.",
      });
    }
  }

  return {
    publicacoes: Array.from(publicacoesMap.values()),
    consultasExecutadas,
    falhas,
  };
}
