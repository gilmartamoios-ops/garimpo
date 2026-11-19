
import { NextRequest, NextResponse } from "next/server";

import {
  buscarAutoresOpenAlex,
} from "@/lib/conectores/openalex";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const consulta = searchParams.get("q") ?? "";

    const limiteInformado = Number(
      searchParams.get("limite") ?? 10
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
      ? Math.min(25, Math.max(1, Math.floor(limiteInformado)))
      : 10;

    const pesquisa = await buscarAutoresOpenAlex(
      consulta,
      limite
    );

    return NextResponse.json({
      sucesso: true,
      fonte: "OpenAlex",
      consulta: pesquisa.consulta,
      quantidadeTotal: pesquisa.quantidadeTotal,
      quantidadeRetornada: pesquisa.resultados.length,
      resultados: pesquisa.resultados,
    });
  } catch (erro) {
    console.error("Erro na integração OpenAlex:", erro);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível consultar o OpenAlex.",
      },
      { status: 502 }
    );
  }
}
