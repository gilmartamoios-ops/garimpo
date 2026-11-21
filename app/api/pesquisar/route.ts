
import { NextResponse } from "next/server";

import { prepararPesquisa } from "@/lib/pesquisa";
import { buscarPublicacoesBlueskyEmLote } from "@/lib/conectores/bluesky";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITE_POR_CONSULTA = 10;

type Publicacao = {
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

type GrupoConsolidado = {
  grupo: string;
  publicacoes: Publicacao[];
  total: number;
  consultasExecutadas: string[];
  falhas: { consulta: string; erro: string }[];
};

type PerfilConsolidado = {
  identificador: string;
  nome: string;
  perfil: string;
  avatar?: string;
  publicacaoPrincipal: Publicacao;
  evidencias: Publicacao[];
  grupos: string[];
};

export async function POST(request: Request) {
  try {
    const corpo = await request.json();

    const ambienteId =
      typeof corpo?.ambienteId === "string"
        ? corpo.ambienteId.trim()
        : "";

    if (!ambienteId) {
      return NextResponse.json(
        { erro: "Informe o ambiente do garimpo." },
        { status: 400 }
      );
    }

    const pesquisa = prepararPesquisa({
      ambienteId,
      consulta: "",
      filtros: {},
    });

    const resultadosBrutos: GrupoConsolidado[] = [];

    // Executa as consultas de cada grupo.
    for (const grupo of pesquisa.grupos) {
      const consultas = pesquisa.consultasBluesky
        .filter((item) => item.grupo === grupo)
        .map((item) => item.consulta);

      const resultado = await buscarPublicacoesBlueskyEmLote(
        consultas,
        LIMITE_POR_CONSULTA
      );

      resultadosBrutos.push({
        grupo,
        publicacoes: resultado.publicacoes,
        total: resultado.publicacoes.length,
        consultasExecutadas: resultado.consultasExecutadas,
        falhas: resultado.falhas,
      });
    }

    // Consolida todos os grupos em uma única lista de perfis.
    const perfisMap = new Map<string, PerfilConsolidado>();
    const publicacoesMap = new Map<string, Publicacao>();

    for (const grupo of resultadosBrutos) {
      for (const publicacao of grupo.publicacoes) {
        // Evita contar a mesma publicação mais de uma vez.
        if (!publicacoesMap.has(publicacao.uri)) {
          publicacoesMap.set(publicacao.uri, publicacao);
        }

        const identificador =
          publicacao.autor.identificador.trim().toLowerCase();

        if (!identificador) {
          continue;
        }

        const perfilExistente = perfisMap.get(identificador);

        if (!perfilExistente) {
          perfisMap.set(identificador, {
            identificador,
            nome: publicacao.autor.nome,
            perfil: publicacao.autor.perfil,
            avatar: publicacao.autor.avatar,
            publicacaoPrincipal: publicacao,
            evidencias: [publicacao],
            grupos: [grupo.grupo],
          });

          continue;
        }

        // Preserva as evidências sem repetir a mesma publicação.
        const evidenciaJaExiste = perfilExistente.evidencias.some(
          (item) => item.uri === publicacao.uri
        );

        if (!evidenciaJaExiste) {
          perfilExistente.evidencias.push(publicacao);
        }

        // Registra todos os grupos em que o perfil apareceu.
        if (!perfilExistente.grupos.includes(grupo.grupo)) {
          perfilExistente.grupos.push(grupo.grupo);
        }

        // Mantém como principal a publicação mais recente.
        const dataAtual = new Date(
          perfilExistente.publicacaoPrincipal.publicadaEm
        ).getTime();

        const dataNova = new Date(publicacao.publicadaEm).getTime();

        if (
          Number.isFinite(dataNova) &&
          (!Number.isFinite(dataAtual) || dataNova > dataAtual)
        ) {
          perfilExistente.publicacaoPrincipal = publicacao;
        }
      }
    }

    const perfis = Array.from(perfisMap.values());

    // Mantém a estrutura de grupos esperada pela tela atual,
    // mas apresenta cada perfil somente uma vez na lista principal.
    const gruposConsolidados = resultadosBrutos.map((grupo) => {
      const perfisDoGrupo = perfis.filter(
        (perfil) => perfil.grupos[0] === grupo.grupo
      );

      return {
        grupo: grupo.grupo,
        publicacoes: perfisDoGrupo.map(
          (perfil) => perfil.publicacaoPrincipal
        ),
        total: perfisDoGrupo.length,
        consultasExecutadas: grupo.consultasExecutadas,
        falhas: grupo.falhas,
      };
    });

    const totalPublicacoesEncontradas = publicacoesMap.size;
    const totalPerfis = perfis.length;

    const totalFalhas = resultadosBrutos.reduce(
      (total, grupo) => total + grupo.falhas.length,
      0
    );

    return NextResponse.json(
      {
        pesquisaId: pesquisa.id,
        nicho: pesquisa.nichoNome,
        ambiente: pesquisa.ambienteNome,
        fonte: "Bluesky",
        status:
          totalFalhas === 0
            ? "executada"
            : "executada_com_falhas",
        totalPublicacoes: totalPublicacoesEncontradas,
        totalPerfis,
        perfis,
        grupos: gruposConsolidados,
        consultadoEm: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (erro) {
    return NextResponse.json(
      {
        erro:
          erro instanceof Error
            ? erro.message
            : "Não foi possível executar o garimpo.",
      },
      { status: 500 }
    );
  }
}
