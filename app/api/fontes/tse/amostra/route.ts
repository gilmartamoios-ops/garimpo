
import { NextRequest, NextResponse } from "next/server";

import {
  buscarAmostraCandidatosRJ2024TSE,
} from "@/lib/conectores/zip-tse";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CAMPOS_PUBLICOS = [
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

export async function GET(request: NextRequest) {
  try {
    const parametros = request.nextUrl.searchParams;
    const limiteInformado = parametros.get("limite");

    const limite =
      limiteInformado === null
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

    const colunasDisponiveis =
      CAMPOS_PUBLICOS.filter((campo) =>
        resultado.colunas.includes(campo)
      );

    const registros = resultado.registros.map(
      (registro) => {
        const registroPublico: Record<
          string,
          string | null
        > = {};

        for (const campo of colunasDisponiveis) {
          registroPublico[campo] =
            registro[campo] ?? null;
        }

        return registroPublico;
      }
    );

    return NextResponse.json({
      sucesso: true,
      fonte: resultado.fonte,
      arquivo: resultado.arquivo,
      estado: resultado.estado,
      quantidadeRegistros: registros.length,
      quantidadeColunas: colunasDisponiveis.length,
      colunas: colunasDisponiveis,
      registros,
    });
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
