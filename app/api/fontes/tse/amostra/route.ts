
import { NextRequest, NextResponse } from "next/server";

import {
  buscarAmostraCandidatosRJ2024TSE,
} from "@/lib/conectores/zip-tse";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const limiteInformado = Number(
      searchParams.get("limite") ?? 20
    );

    const municipio = (
      searchParams.get("municipio") ?? ""
    ).trim();

    const cargo = (
      searchParams.get("cargo") ?? ""
    ).trim();

    const limite = Number.isFinite(limiteInformado)
      ? Math.min(100, Math.max(1, Math.floor(limiteInformado)))
      : 20;

    if (municipio && (municipio.length < 2 || municipio.length > 100)) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "O município deve ter entre 2 e 100 caracteres.",
        },
        { status: 400 }
      );
    }

    if (cargo && (cargo.length < 3 || cargo.length > 50)) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "O cargo deve ter entre 3 e 50 caracteres.",
        },
        { status: 400 }
      );
    }

    const resultado = await buscarAmostraCandidatosRJ2024TSE(
      limite,
      municipio || undefined,
      cargo || undefined
    );

    const camposPublicos = [
      "ANO_ELEICAO",
      "SG_UF",
      "NM_UE",
      "DS_CARGO",
      "NR_CANDIDATO",
      "NM_CANDIDATO",
      "NM_URNA_CANDIDATO",
      "SG_PARTIDO",
      "DS_SITUACAO_CANDIDATURA",
    ];

    const registros = resultado.registros.map((registro) => {
      const registroPublico: Record<string, string> = {};

      for (const campo of camposPublicos) {
        registroPublico[campo] = registro[campo] ?? "";
      }

      return registroPublico;
    });

    return NextResponse.json({
      sucesso: true,
      fonte: "TSE - Dados Abertos",
      arquivo: resultado.arquivo,
      estado: resultado.estado,
      municipio: resultado.municipio,
      cargo: resultado.cargo,
      quantidadeRegistros: registros.length,
      quantidadeColunas: camposPublicos.length,
      colunas: camposPublicos,
      registros,
    });
  } catch (erro) {
    console.error("Erro na amostra do TSE:", erro);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Não foi possível consultar a amostra de candidaturas do TSE.",
      },
      { status: 502 }
    );
  }
}
