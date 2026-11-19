
import { NextRequest, NextResponse } from "next/server";

import {
  buscarConjuntosTSE,
} from "@/lib/conectores/tse";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const consulta = searchParams.get("q") ?? "";

    const limiteInformado = Number(
      searchParams.get("limite") ?? 10
    );

    const paginaInformada = Number(
      searchParams.get("pagina") ?? 1
    );

    if (consulta.trim().length < 2) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "Informe pelo menos dois caracteres para pesquisar no TSE.",
        },
        { status: 400 }
      );
    }

    const limite = Number.isFinite(limiteInformado)
      ? Math.min(25, Math.max(1, Math.floor(limiteInformado)))
      : 10;

    const pagina = Number.isFinite(paginaInformada)
      ? Math.max(1, Math.floor(paginaInformada))
      : 1;

    const pesquisa = await buscarConjuntosTSE(
      consulta,
      limite,
      pagina
    );

    return NextResponse.json({
      sucesso: true,
      fonte: "TSE - Dados Abertos",
      consulta: pesquisa.consulta,
      quantidadeTotal: pesquisa.quantidadeTotal,
      quantidadeRetornada: pesquisa.resultados.length,
      pagina,
      resultados: pesquisa.resultados,
    });
  } catch (erro) {
    console.error("Erro na integração TSE:", erro);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível consultar os dados abertos do TSE.",
      },
      { status: 502 }
    );
  }
}
