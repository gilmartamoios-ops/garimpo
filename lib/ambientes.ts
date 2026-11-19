
export type Ambiente = {
  id: string;
  nome: string;
  descricao: string;
  finalidade: string;
  categorias: string[];
  ativo: boolean;
};

export const ambientes: Ambiente[] = [
  {
    id: "pessoas",
    nome: "Pessoas",
    descricao:
      "Descoberta e identificação de pessoas a partir de informações disponíveis em fontes autorizadas.",
    finalidade: "Identificação e pesquisa de pessoas",
    categorias: [
      "Identificação",
      "Localização pública",
      "Vínculos institucionais",
      "Atuação pública",
    ],
    ativo: true,
  },
  {
    id: "profissionais",
    nome: "Profissionais",
    descricao:
      "Pesquisa de profissionais por formação, experiência, competências e áreas de atuação.",
    finalidade: "Recrutamento e identificação profissional",
    categorias: [
      "Formação",
      "Experiência",
      "Competências",
      "Especialidades",
      "Área de atuação",
    ],
    ativo: true,
  },
  {
    id: "empresas",
    nome: "Empresas",
    descricao:
      "Descoberta de empresas por segmento, localização, porte e características institucionais.",
    finalidade: "Pesquisa e prospecção empresarial",
    categorias: [
      "Segmento",
      "Localização",
      "Porte",
      "Atividade econômica",
      "Presença digital",
    ],
    ativo: true,
  },
  {
    id: "organizacoes",
    nome: "Organizações",
    descricao:
      "Pesquisa de associações, instituições, entidades e outras organizações.",
    finalidade: "Pesquisa institucional",
    categorias: [
      "Tipo de organização",
      "Área de atuação",
      "Localização",
      "Finalidade institucional",
      "Presença pública",
    ],
    ativo: true,
  },
  {
    id: "temas",
    nome: "Temas e assuntos",
    descricao:
      "Pesquisa temática para descobrir informações, iniciativas, projetos e conexões.",
    finalidade: "Investigação temática",
    categorias: [
      "Assunto",
      "Palavras-chave",
      "Projetos",
      "Iniciativas",
      "Referências públicas",
    ],
    ativo: true,
  },
];

export function buscarAmbiente(id: string): Ambiente | undefined {
  return ambientes.find((ambiente) => ambiente.id === id);
}
