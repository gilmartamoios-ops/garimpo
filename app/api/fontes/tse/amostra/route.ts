
import { NextRequest, NextResponse } from "next/server";

import {
  buscarAmostraCandidatosRJ2024TSE,
} from "@/lib/conectores/zip-tse";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const parametros = request.nextUrl.searchParams;

    const limiteInformado = parametros.get("limite");

    const limite = limiteInformado === null
      ? 20
      : Number(limiteInformado);

    if (
      !Number.isInteger(limite) ||
      limite < 1 ||
      limite > 100
    ) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "O limite deve ser um número inteiro entre 1 e 100.",
        },
        { status: 400 }
      );
    }

    const resultado =
      await buscarAmostraCandidatosRJ2024TSE(limite);

    return NextResponse.json(resultado);
  } catch (erro) {
    console.error(
      "Erro ao consultar amostra de candidatos do TSE:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível consultar os candidatos do TSE.",
      },
      { status: 502 }
    );
  }
}
