
import { NextResponse } from "next/server";

import { prepararPesquisa } from "@/lib/pesquisa";
import { buscarPublicacoesBlueskyEmLote } from "@/lib/conectores/bluesky";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITE_POR_CONSULTA = 10;

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

    const resultados = [];

    for (const grupo of pesquisa.grupos) {
      const consultas = pesquisa.consultasBluesky
        .filter((item) => item.grupo === grupo)
        .map((item) => item.consulta);

      const resultado = await buscarPublicacoesBlueskyEmLote(
        consultas,
        LIMITE_POR_CONSULTA
      );

      resultados.push({
        grupo,
        publicacoes: resultado.publicacoes,
        total: resultado.publicacoes.length,
        consultasExecutadas: resultado.consultasExecutadas,
        falhas: resultado.falhas,
      });
    }

    const totalPublicacoes = resultados.reduce(
      (total, grupo) => total + grupo.total,
      0
    );

    const totalFalhas = resultados.reduce(
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
        totalPublicacoes,
        grupos: resultados,
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
