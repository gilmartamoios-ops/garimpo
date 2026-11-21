
import { buscarAmbiente } from "./ambientes";
import {
  montarConsultasWeb,
  type ConsultaWebGerada,
} from "./conectores/consultas-web";

export type {
  ResultadoPesquisa,
} from "./resultados";

export {
  validarResultados,
} from "./resultados";

export type GrupoGarimpo =
  | "consumidores_suplementos"
  | "interesse_suplementos"
  | "publico_conteudos_afins"
  | "empreendedores_venda_direta";

export type ConsultaBluesky = {
  grupo: GrupoGarimpo;
  descricao: string;
  consulta: string;
};

export type SolicitacaoPesquisa = {
  ambienteId: string;
  consulta: string;
  filtros?: Record<string, string | string[]>;
};

export type PesquisaOrganizada = {
  id: string;
  ambienteId: string;
  ambienteNome: string;
  nichoId: string;
  nichoNome: string;
  consultaOriginal: string;
  consultaNormalizada: string;
  filtros: Record<string, string | string[]>;
  grupos: GrupoGarimpo[];
  consultasBluesky: ConsultaBluesky[];
  consultasWeb: ConsultaWebGerada[];
  status: "preparada";
  criadaEm: string;
};

function montarEstrategiaMMN(
  ambienteId: string
): {
  grupos: GrupoGarimpo[];
  consultas: ConsultaBluesky[];
} {
  const consultasConsumidores: ConsultaBluesky[] = [
    {
      grupo: "consumidores_suplementos",
      descricao: "Pessoas falando sobre consumo de suplementos",
      consulta: "suplementos",
    },
    {
      grupo: "consumidores_suplementos",
      descricao: "Pessoas falando sobre whey protein",
      consulta: '"whey protein"',
    },
    {
      grupo: "consumidores_suplementos",
      descricao: "Pessoas falando sobre creatina",
      consulta: "creatina",
    },
    {
      grupo: "interesse_suplementos",
      descricao: "Pessoas procurando indicação de suplementos",
      consulta: "indicação suplemento",
    },
    {
      grupo: "interesse_suplementos",
      descricao: "Pessoas demonstrando interesse em nutrição esportiva",
      consulta: '"nutrição esportiva"',
    },
    {
      grupo: "publico_conteudos_afins",
      descricao: "Pessoas publicando sobre saúde e suplementação",
      consulta: "suplementação saúde",
    },
  ];

  const consultasEmpreendedorismo: ConsultaBluesky[] = [
    {
      grupo: "empreendedores_venda_direta",
      descricao: "Consultores e profissionais de venda direta",
      consulta: '"venda direta"',
    },
    {
      grupo: "empreendedores_venda_direta",
      descricao: "Pessoas falando sobre revenda de produtos",
      consulta: '"revenda de produtos"',
    },
    {
      grupo: "empreendedores_venda_direta",
      descricao: "Pessoas falando sobre negócio próprio e vendas",
      consulta: '"negócio próprio" vendas',
    },
    {
      grupo: "empreendedores_venda_direta",
      descricao: "Pessoas falando sobre consultoria de produtos",
      consulta: "consultora produtos",
    },
  ];

  if (ambienteId === "profissionais") {
    return {
      grupos: ["empreendedores_venda_direta"],
      consultas: consultasEmpreendedorismo,
    };
  }

  return {
    grupos: [
      "consumidores_suplementos",
      "interesse_suplementos",
      "publico_conteudos_afins",
    ],
    consultas: consultasConsumidores,
  };
}

export function prepararPesquisa(
  solicitacao: SolicitacaoPesquisa
): PesquisaOrganizada {
  const ambiente = buscarAmbiente(solicitacao.ambienteId);

  if (!ambiente || !ambiente.ativo) {
    throw new Error(
      "Ambiente de pesquisa não encontrado ou inativo."
    );
  }

  const consulta = (solicitacao.consulta ?? "").trim();

  const filtros = Object.fromEntries(
    Object.entries(solicitacao.filtros ?? {})
      .map(([chave, valor]) => {
        if (Array.isArray(valor)) {
          return [
            chave,
            valor.map((item) => item.trim()).filter(Boolean),
          ];
        }

        return [chave, valor.trim()];
      })
      .filter(([, valor]) =>
        Array.isArray(valor)
          ? valor.length > 0
          : valor !== ""
      )
  ) as Record<string, string | string[]>;

  const estrategia = montarEstrategiaMMN(ambiente.id);

  // Consultas externas antigas só são montadas quando
  // existe uma solicitação manual com descrição ou filtros.
  // O garimpo automático utiliza a estratégia do nicho.
  const possuiSolicitacaoManual =
    consulta.length > 0 || Object.keys(filtros).length > 0;

  const consultasWeb = possuiSolicitacaoManual
    ? montarConsultasWeb({
        ambienteId: ambiente.id,
        consulta,
        filtros,
      })
    : [];

  return {
    id: crypto.randomUUID(),
    ambienteId: ambiente.id,
    ambienteNome: ambiente.nome,
    nichoId: "mmn-suplementos",
    nichoNome: "MMN — Suplementos e venda direta",
    consultaOriginal: consulta,
    consultaNormalizada: consulta
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
    filtros,
    grupos: estrategia.grupos,
    consultasBluesky: estrategia.consultas,
    consultasWeb,
    status: "preparada",
    criadaEm: new Date().toISOString(),
  };
}
