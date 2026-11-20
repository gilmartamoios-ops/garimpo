
import { NextResponse } from "next/server";

import {
  inspecionarZIPCandidatos2024TSE,
} from "@/lib/conectores/zip-tse";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function GET() {
  try {
    const resultado =
      await inspecionarZIPCandidatos2024TSE();

    return NextResponse.json({
      sucesso: true,
      fonte: resultado.fonte,
      quantidadeArquivos:
        resultado.quantidadeArquivos,
      quantidadeCSVs:
        resultado.quantidadeCSVs,
      arquivos: resultado.arquivos,
    });
  } catch (erro) {
    console.error(
      "Erro ao inspecionar ZIP do TSE:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          erro instanceof Error
            ? erro.message
            : "Não foi possível inspecionar o ZIP do TSE.",
      },
      { status: 502 }
    );
  }
}
