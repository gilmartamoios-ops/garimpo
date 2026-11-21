
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
    nome: "Consumidores",
    descricao:
      "Descoberta de publicações e conversas públicas relacionadas a produtos, experiências, necessidades, dúvidas e interesses nos segmentos de suplementos, nutracêuticos, ozonioterapia, cuidados pessoais e beleza.",
    finalidade:
      "Encontrar os melhores veios de conversas e oportunidades de relacionamento com consumidores, priorizando manifestações espontâneas de interesse, pedidos de indicação, experiências e procura por soluções.",
    categorias: [
      "Suplementos e nutrição",
      "Nutracêuticos",
      "Ozonioterapia e bem-estar",
      "Cuidados pessoais e beleza",
      "Emagrecimento e hábitos saudáveis",
      "Vitaminas e suplementação",
      "Articulações e mobilidade",
      "Sono e qualidade de vida",
      "Saúde e bem-estar emocional",
      "Recomendações e avaliações",
      "Interesse em comprar",
      "Experiências com produtos",
    ],
    filtros: [
      {
        id: "localizacao",
        nome: "Localização",
        descricao:
          "Informe a cidade, estado ou região para contextualizar a busca por publicações e conversas públicas.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "marcas",
        nome: "Marcas de interesse",
        descricao:
          "Informe marcas relacionadas aos produtos e segmentos pesquisados.",
        placeholder:
          "Ex.: marcas de suplementos, nutracêuticos e cosméticos",
      },
      {
        id: "categoriasProdutos",
        nome: "Categorias de produtos",
        descricao:
          "Indique os segmentos de produtos e serviços que deseja explorar.",
        placeholder:
          "Ex.: whey protein, creatina, vitaminas, nutracêuticos, ozonioterapia, skincare, cosméticos",
      },
      {
        id: "temasBemEstar",
        nome: "Temas de saúde e bem-estar",
        descricao:
          "Explore conversas públicas sobre necessidades, dúvidas e temas de bem-estar. O resultado deve representar o assunto da publicação, não um diagnóstico ou classificação de seu autor.",
        placeholder:
          "Ex.: articulações, mobilidade, emagrecimento, vitaminas, sono, diabetes, pressão arterial, saúde emocional",
      },
      {
        id: "interesseCompra",
        nome: "Procura por produtos e soluções",
        descricao:
          "Encontre publicações com pedidos de indicação, comparações, dúvidas sobre produtos e manifestações explícitas de interesse.",
        placeholder:
          "Ex.: procurando suplemento, indicação de vitaminas, recomendação de hidratante",
      },
      {
        id: "recomendacoesAvaliacoes",
        nome: "Recomendações e experiências",
        descricao:
          "Procure conversas públicas com avaliações, relatos de experiências e pedidos de recomendações.",
        placeholder:
          "Ex.: alguém já usou, qual produto recomenda, experiência com creatina",
      },
      {
        id: "cuidadosPessoais",
        nome: "Cuidados pessoais e beleza",
        descricao:
          "Explore conversas sobre autocuidado, cosméticos, estética, pele, cabelo e produtos de beleza.",
        placeholder:
          "Ex.: skincare, cuidados com a pele, hidratação capilar, maquiagem",
      },
      {
        id: "ozonioterapia",
        nome: "Ozonioterapia",
        descricao:
          "Localize conversas públicas sobre o tema, procura por informações, experiências e interesse em serviços, sem presumir eficácia ou indicação terapêutica.",
        placeholder:
          "Ex.: ozonioterapia, informações, experiências e serviços",
      },
      {
        id: "recencia",
        nome: "Atualidade das publicações",
        descricao:
          "Defina o período desejado para encontrar publicações e conversas relevantes.",
        placeholder:
          "Ex.: últimos 30 dias, últimos 3 meses, últimos 12 meses",
      },
    ],
    ativo: true,
  },
  {
    id: "profissionais",
    nome: "Profissionais de vendas diretas",
    descricao:
      "Descoberta de publicações e conversas de pessoas que trabalham com vendas diretas, revenda e representação, além de pessoas que manifestam interesse em empreender, iniciar uma atividade comercial ou conquistar renda extra.",
    finalidade:
      "Encontrar veios com oportunidades de relacionamento com profissionais em atividade e pessoas interessadas em empreendedorismo, vendas diretas e geração de renda.",
    categorias: [
      "Consultoras e revendedoras",
      "Profissionais de vendas diretas",
      "Atividade comercial comprovada",
      "Interesse em começar",
      "Interesse em empreender",
      "Busca por renda extra",
      "Negócio próprio",
      "Revenda e representação",
      "Marcas e empresas",
      "Divulgação de produtos",
      "Liderança e equipes",
    ],
    filtros: [
      {
        id: "localizacao",
        nome: "Localização",
        descricao:
          "Informe a cidade, estado ou região para contextualizar a busca por publicações e profissionais.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "marcas",
        nome: "Marcas ou empresas",
        descricao:
          "Indique marcas e empresas relacionadas às atividades de venda direta.",
        placeholder:
          "Ex.: Natura, O Boticário, Avon, Jequiti",
      },
      {
        id: "tipoAtuacao",
        nome: "Tipo de atuação",
        descricao:
          "Informe as atividades comerciais que deseja encontrar.",
        placeholder:
          "Ex.: consultora, revendedora, representante, vendedora",
      },
      {
        id: "situacaoProfissional",
        nome: "Situação profissional",
        descricao:
          "Diferencie evidências públicas de atividade comercial de manifestações de interesse em começar.",
        placeholder:
          "Ex.: profissional em atividade, interessado em começar",
      },
      {
        id: "experiencia",
        nome: "Experiência em vendas diretas",
        descricao:
          "Procure relatos públicos de experiência com revenda, representação, consultoria e comercialização de produtos.",
        placeholder:
          "Ex.: revenda de cosméticos, consultoria de beleza, vendas por catálogo",
      },
      {
        id: "atividadeComercial",
        nome: "Atividade comercial pública",
        descricao:
          "Procure evidências públicas de divulgação de produtos, ofertas, catálogos, demonstrações e atendimento comercial.",
        placeholder:
          "Ex.: divulgação de catálogo, ofertas, demonstração de produtos",
      },
      {
        id: "interesseIniciar",
        nome: "Interesse em começar",
        descricao:
          "Encontre manifestações públicas de pessoas que desejam iniciar uma atividade comercial ou trabalhar com vendas diretas.",
        placeholder:
          "Ex.: quero começar a revender, trabalhar com vendas, iniciar negócio próprio",
      },
      {
        id: "interesseEmpreender",
        nome: "Interesse em empreender",
        descricao:
          "Explore conversas de pessoas que demonstram interesse em empreender, abrir um negócio ou desenvolver uma atividade própria.",
        placeholder:
          "Ex.: quero empreender, começar meu negócio, trabalhar por conta própria",
      },
      {
        id: "rendaExtra",
        nome: "Busca por renda extra",
        descricao:
          "Encontre publicações em que pessoas manifestam interesse em complementar a renda ou buscar novas oportunidades de trabalho.",
        placeholder:
          "Ex.: procurando renda extra, trabalho complementar, ganhar dinheiro nas horas vagas",
      },
      {
        id: "liderancaEquipes",
        nome: "Liderança e formação de equipes",
        descricao:
          "Identifique publicações sobre liderança, treinamento, orientação e desenvolvimento de equipes comerciais.",
        placeholder:
          "Ex.: líder de equipe, treinamento de consultoras, desenvolvimento de revendedoras",
      },
      {
        id: "recencia",
        nome: "Atualidade das atividades",
        descricao:
          "Defina o período das publicações e evidências que deseja encontrar.",
        placeholder:
          "Ex.: últimos 30 dias, últimos 3 meses, últimos 12 meses",
      },
    ],
    ativo: true,
  },
];

export function buscarAmbiente(id: string): Ambiente | undefined {
  return ambientes.find((ambiente) => ambiente.id === id);
}
