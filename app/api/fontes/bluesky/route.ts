
import { NextRequest, NextResponse } from "next/server";

import {
  buscarPublicacoesBluesky,
} from "@/lib/conectores/bluesky";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const consulta = searchParams.get("q") ?? "";

    const limiteInformado = Number(
      searchParams.get("limite") ?? 20
    );

    if (consulta.trim().length < 2) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "Informe um termo com pelo menos dois caracteres.",
        },
        { status: 400 }
      );
    }

    const limite = Number.isFinite(limiteInformado)
      ? Math.min(100, Math.max(1, Math.floor(limiteInformado)))
      : 20;

    const resultados =
      await buscarPublicacoesBluesky(
        consulta,
        limite
      );

    return NextResponse.json({
      sucesso: true,
      fonte: "Bluesky",
      consulta,
      quantidade: resultados.length,
      resultados,
    });
  } catch (erro) {
    console.error("Erro na integração Bluesky:", erro);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível consultar o Bluesky.",
      },
      { status: 502 }
    );
  }
}
