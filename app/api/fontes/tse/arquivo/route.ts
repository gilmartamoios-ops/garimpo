
import { NextResponse } from "next/server";

import {
  verificarArquivoCandidatos2024TSE,
} from "@/lib/conectores/tse";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const arquivo =
      await verificarArquivoCandidatos2024TSE();

    return NextResponse.json({
      sucesso: true,
      fonte: "TSE - Dados Abertos",
      arquivo,
    });
  } catch (erro) {
    console.error(
      "Erro ao verificar arquivo de candidaturas do TSE:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível verificar o arquivo de candidaturas do TSE.",
      },
      { status: 502 }
    );
  }
}
