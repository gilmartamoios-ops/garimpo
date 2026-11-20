
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
      "Descoberta de perfis individuais com manifestações públicas de interesse em produtos de venda direta, recomendações, revenda ou relacionamento com consultoras.",
    finalidade:
      "Identificação de potenciais consumidores e pessoas interessadas em produtos de venda direta.",
    categorias: [
      "Interesse em comprar",
      "Recomendações e avaliações",
      "Interesse em revenda",
      "Relacionamento com consultoras",
      "Produtos e marcas",
    ],
    filtros: [
      {
        id: "localizacao",
        nome: "Localização",
        descricao:
          "Informe a cidade, estado ou região onde deseja encontrar pessoas.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "marcas",
        nome: "Marcas de interesse",
        descricao:
          "Selecione ou informe as marcas relacionadas à pesquisa.",
        placeholder:
          "Ex.: Natura, O Boticário, Avon, Jequiti",
      },
      {
        id: "categoriasProdutos",
        nome: "Categorias de produtos",
        descricao:
          "Indique os tipos de produtos mencionados publicamente pelas pessoas.",
        placeholder:
          "Ex.: perfumes, maquiagem, cosméticos, cuidados pessoais",
      },
      {
        id: "interesseCompra",
        nome: "Interesse em comprar",
        descricao:
          "Identifique manifestações públicas de procura, intenção de compra ou interesse em adquirir produtos.",
        placeholder:
          "Ex.: procurando perfume, indicação de hidratante, onde comprar",
      },
      {
        id: "recomendacoesAvaliacoes",
        nome: "Recomendações e avaliações",
        descricao:
          "Procure publicações públicas com recomendações, avaliações ou opiniões sobre produtos.",
        placeholder:
          "Ex.: recomendações de perfumes, avaliação de maquiagem",
      },
      {
        id: "relacionamentoConsultoras",
        nome: "Relacionamento com consultoras",
        descricao:
          "Identifique manifestações públicas relacionadas a consultoras, atendimento ou indicação de produtos.",
        placeholder:
          "Ex.: indicação de consultora Natura, contato com revendedora",
      },
      {
        id: "interesseRevenda",
        nome: "Interesse em revenda ou indicação",
        descricao:
          "Procure manifestações públicas de interesse em revender produtos ou recomendá-los a outras pessoas.",
        placeholder:
          "Ex.: interesse em revender cosméticos, indicação de produtos",
      },
      {
        id: "recencia",
        nome: "Atualidade das manifestações",
        descricao:
          "Defina o período desejado para encontrar manifestações públicas recentes.",
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
      "Descoberta de perfis individuais de consultoras, revendedoras e profissionais de vendas diretas, além de pessoas que manifestam publicamente interesse em iniciar nessa atividade.",
    finalidade:
      "Identificação de profissionais em atividade e potenciais profissionais de vendas diretas.",
    categorias: [
      "Consultoras e revendedoras",
      "Atividade comercial comprovada",
      "Interesse em começar",
      "Marcas e empresas",
      "Divulgação de produtos",
      "Liderança e equipes",
    ],
    filtros: [
      {
        id: "localizacao",
        nome: "Localização",
        descricao:
          "Informe a cidade, estado ou região onde deseja encontrar profissionais.",
        placeholder: "Ex.: Cabo Frio, RJ",
      },
      {
        id: "marcas",
        nome: "Marcas ou empresas",
        descricao:
          "Indique as marcas de venda direta relacionadas à pesquisa.",
        placeholder:
          "Ex.: Natura, O Boticário, Avon, Jequiti",
      },
      {
        id: "tipoAtuacao",
        nome: "Tipo de atuação",
        descricao:
          "Informe a atividade profissional que deseja localizar.",
        placeholder:
          "Ex.: consultora, revendedora, representante, vendedora",
      },
      {
        id: "situacaoProfissional",
        nome: "Situação profissional",
        descricao:
          "Diferencie pessoas com atividade comercial demonstrada de pessoas que apenas manifestam interesse em começar.",
        placeholder:
          "Ex.: profissional em atividade, potencial profissional",
      },
      {
        id: "experiencia",
        nome: "Experiência em vendas diretas",
        descricao:
          "Informe experiências ou atividades comerciais mencionadas publicamente.",
        placeholder:
          "Ex.: revenda de cosméticos, consultoria de beleza, vendas por catálogo",
      },
      {
        id: "atividadeComercial",
        nome: "Atividade comercial pública",
        descricao:
          "Procure evidências de divulgação de produtos, ofertas, catálogos, demonstrações ou atendimento comercial.",
        placeholder:
          "Ex.: divulgação de catálogo, ofertas, demonstração de produtos",
      },
      {
        id: "interesseIniciar",
        nome: "Interesse em começar",
        descricao:
          "Procure manifestações públicas de interesse em iniciar uma atividade comercial ou trabalhar com vendas diretas.",
        placeholder:
          "Ex.: começar a revender, trabalhar com cosméticos, iniciar negócio próprio",
      },
      {
        id: "liderancaEquipes",
        nome: "Liderança e formação de equipes",
        descricao:
          "Identifique evidências públicas de liderança, orientação ou formação de equipes comerciais.",
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
