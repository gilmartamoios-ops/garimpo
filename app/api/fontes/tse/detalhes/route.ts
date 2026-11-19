
import { NextRequest, NextResponse } from "next/server";

import {
  buscarDetalhesConjuntoTSE,
} from "@/lib/conectores/tse";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const identificador =
      request.nextUrl.searchParams.get("id") ?? "";

    if (!identificador.trim()) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "Informe o identificador do conjunto de dados do TSE.",
        },
        { status: 400 }
      );
    }

    const conjunto =
      await buscarDetalhesConjuntoTSE(identificador);

    return NextResponse.json({
      sucesso: true,
      fonte: "TSE - Dados Abertos",
      conjunto: {
        id: conjunto.id,
        nome: conjunto.nome,
        titulo: conjunto.titulo,
        descricao: conjunto.descricao,
        atualizadoEm: conjunto.atualizadoEm,
        endereco: conjunto.endereco,
      },
      quantidadeRecursos: conjunto.recursos.length,
      recursos: conjunto.recursos,
    });
  } catch (erro) {
    console.error(
      "Erro ao consultar detalhes do conjunto TSE:",
      erro
    );

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível consultar os detalhes do conjunto no TSE.",
      },
      { status: 502 }
    );
  }
}
