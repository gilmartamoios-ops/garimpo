
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
    filtros: [
      {
        id: "nomeOrganizacao",
        nome: "Nome da organização",
        descricao: "Informe o nome completo ou parcial da organização.",
        placeholder: "Ex.: Instituto, Associação ou Fundação",
      },
      {
        id: "tipoOrganizacao",
        nome: "Tipo de organização",
        descricao: "Indique a natureza ou categoria da organização.",
        placeholder: "Ex.: associação, instituto, fundação, ONG",
      },
      {
        id: "areaAtuacao",
        nome: "Área de atuação",
        descricao: "Informe a área em que a organização desenvolve suas atividades.",
        placeholder: "Ex.: educação, cultura, assistência social",
      },
      {
        id: "localizacao",
        nome: "Localização",
        descricao: "Informe a cidade, estado ou região da organização.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "finalidadeInstitucional",
        nome: "Finalidade institucional",
        descricao: "Descreva a finalidade ou missão da organização.",
        placeholder: "Ex.: inclusão social, desenvolvimento comunitário",
      },
      {
        id: "projetosIniciativas",
        nome: "Projetos e iniciativas",
        descricao: "Informe projetos, programas ou iniciativas relacionados.",
        placeholder: "Ex.: capacitação, voluntariado, preservação ambiental",
      },
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
      "Assunto principal",
      "Palavras-chave",
      "Localização",
      "Projetos e iniciativas",
      "Período",
      "Fontes e referências",
    ],
    filtros: [
      {
        id: "assuntoPrincipal",
        nome: "Assunto principal ou tema",
        descricao: "Informe o tema central que deseja investigar.",
        placeholder: "Ex.: desenvolvimento sustentável, educação, inovação",
      },
      {
        id: "palavrasChave",
        nome: "Palavras-chave",
        descricao: "Acrescente termos relacionados para ampliar ou refinar a pesquisa.",
        placeholder: "Ex.: políticas públicas, tecnologia, inclusão",
      },
      {
        id: "localizacao",
        nome: "Localização ou região",
        descricao: "Indique a região geográfica relacionada ao assunto, se houver.",
        placeholder: "Ex.: Brasil, Rio de Janeiro, Região dos Lagos",
      },
      {
        id: "projetosIniciativas",
        nome: "Projetos e iniciativas",
        descricao: "Informe projetos, programas, ações ou iniciativas relacionadas ao tema.",
        placeholder: "Ex.: campanhas, pesquisas, programas comunitários",
      },
      {
        id: "periodo",
        nome: "Período ou recorte temporal",
        descricao: "Defina o período de interesse para a pesquisa.",
        placeholder: "Ex.: 2020 a 2025, últimos 12 meses",
      },
      {
        id: "fontesReferencia",
        nome: "Fontes ou tipos de referência",
        descricao: "Indique os tipos de materiais ou fontes que deseja encontrar.",
        placeholder: "Ex.: notícias, estudos, pesquisas, documentos",
      },
    ],
    ativo: true,
  },
];

export function buscarAmbiente(id: string): Ambiente | undefined {
  return ambientes.find((ambiente) => ambiente.id === id);
}
