import { NextRequest, NextResponse } from "next/server";

import {
  buscarEstados,
  buscarMunicipiosPorEstado,
  buscarMunicipiosPorNome,
} from "@/lib/conectores/ibge";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const operacao = searchParams.get("operacao");

    if (operacao === "estados") {
      const estados = await buscarEstados();

      return NextResponse.json({
        sucesso: true,
        fonte: "IBGE",
        quantidade: estados.length,
        resultados: estados,
      });
    }

    if (operacao === "municipios") {
      const estadoId = Number(searchParams.get("estadoId"));

      if (
        !Number.isInteger(estadoId) ||
        estadoId <= 0
      ) {
        return NextResponse.json(
          {
            sucesso: false,
            mensagem: "Informe um identificador de estado válido.",
          },
          { status: 400 }
        );
      }

      const municipios =
        await buscarMunicipiosPorEstado(estadoId);

      return NextResponse.json({
        sucesso: true,
        fonte: "IBGE",
        quantidade: municipios.length,
        resultados: municipios,
      });
    }

    if (operacao === "buscar-municipio") {
      const nome = searchParams.get("nome") ?? "";

      if (!nome.trim()) {
        return NextResponse.json(
          {
            sucesso: false,
            mensagem: "Informe o nome do município.",
          },
          { status: 400 }
        );
      }

      const municipios = await buscarMunicipiosPorNome(nome);

      return NextResponse.json({
        sucesso: true,
        fonte: "IBGE",
        quantidade: municipios.length,
        resultados: municipios,
      });
    }

    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Operação inválida. Utilize estados, municipios ou buscar-municipio.",
      },
      { status: 400 }
    );
  } catch (erro) {
    console.error("Erro na integração IBGE:", erro);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Não foi possível consultar o IBGE.",
      },
      { status: 502 }
    );
  }
}
