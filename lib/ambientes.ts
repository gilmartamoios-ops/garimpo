
export type FiltroAmbiente = {
  id: string;
  nome: string;
  descricao: string;
  placeholder: string;
};

export type Ambiente = {
  id: string;
  nome: string;
  descricao: string;
  finalidade: string;
  categorias: string[];
  filtros: FiltroAmbiente[];
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
    filtros: [
      {
        id: "nome",
        nome: "Nome ou parte do nome",
        descricao: "Informe o nome que deseja localizar.",
        placeholder: "Ex.: João da Silva",
      },
      {
        id: "profissao",
        nome: "Profissão ou ocupação",
        descricao: "Qual é a profissão ou atividade da pessoa?",
        placeholder: "Ex.: advogado, médico, professor",
      },
      {
        id: "localizacao",
        nome: "Localização",
        descricao: "Informe a cidade, estado ou região.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "areaAtuacao",
        nome: "Área de atuação",
        descricao: "Em qual área a pessoa atua?",
        placeholder: "Ex.: educação, saúde, tecnologia",
      },
      {
        id: "organizacao",
        nome: "Organização ou instituição",
        descricao: "Informe uma empresa ou instituição relacionada.",
        placeholder: "Ex.: universidade, associação, empresa",
      },
      {
        id: "palavrasChave",
        nome: "Palavras-chave",
        descricao: "Acrescente termos que ajudem a refinar a pesquisa.",
        placeholder: "Ex.: projetos sociais, liderança, palestras",
      },
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
    filtros: [
      {
        id: "profissao",
        nome: "Profissão",
        descricao: "Informe a profissão que deseja encontrar.",
        placeholder: "Ex.: engenheiro, contador, advogado",
      },
      {
        id: "especialidade",
        nome: "Especialidade",
        descricao: "Indique a especialização ou área técnica do profissional.",
        placeholder: "Ex.: direito trabalhista, cardiologia",
      },
      {
        id: "localizacao",
        nome: "Localização",
        descricao: "Informe a cidade, estado ou região de atuação.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "formacao",
        nome: "Formação ou qualificação",
        descricao: "Informe a formação acadêmica ou qualificação desejada.",
        placeholder: "Ex.: graduação em administração, técnico em informática",
      },
      {
        id: "experiencia",
        nome: "Experiência profissional",
        descricao: "Descreva o nível ou tipo de experiência procurada.",
        placeholder: "Ex.: iniciante, sênior, gestão de equipes",
      },
      {
        id: "competencias",
        nome: "Competências e habilidades",
        descricao: "Informe conhecimentos e habilidades relevantes.",
        placeholder: "Ex.: liderança, vendas, programação",
      },
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
    filtros: [
      {
        id: "nomeEmpresa",
        nome: "Nome ou razão social",
        descricao: "Informe o nome da empresa que deseja localizar.",
        placeholder: "Ex.: Empresa Exemplo Ltda.",
      },
      {
        id: "segmento",
        nome: "Segmento empresarial",
        descricao: "Indique o setor ou segmento em que a empresa atua.",
        placeholder: "Ex.: construção civil, tecnologia, saúde",
      },
      {
        id: "localizacao",
        nome: "Localização",
        descricao: "Informe a cidade, estado ou região da empresa.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "porte",
        nome: "Porte da empresa",
        descricao: "Informe o porte empresarial desejado.",
        placeholder: "Ex.: MEI, microempresa, pequena, média ou grande",
      },
      {
        id: "atividadeEconomica",
        nome: "Atividade econômica",
        descricao: "Descreva a atividade principal ou secundária da empresa.",
        placeholder: "Ex.: fabricação de móveis, comércio varejista",
      },
      {
        id: "presencaDigital",
        nome: "Site ou presença digital",
        descricao: "Indique o tipo de presença digital que deseja localizar.",
        placeholder: "Ex.: site próprio, loja virtual, redes sociais",
      },
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
    filtros: [],
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
    filtros: [],
    ativo: true,
  },
];

export function buscarAmbiente(id: string): Ambiente | undefined {
  return ambientes.find((ambiente) => ambiente.id === id);
}
