# GArimpo 1.0 — Arquitetura da Plataforma

## 1. Identidade

**GArimpo — Inteligência de busca, descoberta e identificação.**

O GArimpo é uma plataforma independente de inteligência de pesquisa, descoberta e identificação de pessoas e perfis individuais a partir de informações públicas e fontes autorizadas.

Seu objetivo é transformar solicitações de pesquisa em resultados organizados, contextualizados e verificáveis, permitindo descobrir pessoas, identificar manifestações públicas, analisar correspondências e construir perfis inteligentes com evidências rastreáveis.

O GArimpo deverá oferecer mais do que links de pesquisa: seu núcleo de inteligência deverá evoluir para executar pesquisas, recuperar informações, identificar possíveis correspondências, organizar evidências e apresentar resultados compreensíveis.

## 2. Escopo comercial do GArimpo 1.0

A primeira versão comercial será especializada em vendas diretas e relacionamento com consumidores e profissionais desse segmento.

Terá dois ambientes:

### 2.1. Consumidores

Destinado à descoberta de pessoas que manifestam publicamente interesses relacionados a:

- Produtos de marcas de vendas diretas.
- Intenção de compra.
- Recomendações e avaliações.
- Relacionamento com consultoras.
- Interesse em revenda.
- Relacionamento com determinadas categorias de produtos.

O ambiente deverá distinguir manifestações públicas de interesse de uma intenção de compra efetivamente confirmada.

Não deverá inferir histórico de compras a partir de curtidas, comentários genéricos ou interações isoladas.

### 2.2. Profissionais de vendas diretas

Destinado à descoberta de pessoas que apresentam manifestações públicas relacionadas à atividade comercial de vendas diretas.

Deverá identificar, conforme as evidências disponíveis:

- Profissionais em atividade.
- Consultoras e revendedoras.
- Pessoas que divulgam produtos e oportunidades comerciais.
- Pessoas que demonstram interesse público em começar.
- Pessoas com manifestações públicas de interesse em renda extra.
- Lideranças e atividades de organização de equipes, quando demonstradas por fontes verificáveis.

O sistema deverá distinguir `profissional_em_atividade` de `potencial_profissional`.

A expressão renda extra será tratada como sinal público de interesse, não como prova de desemprego, adesão a MMN ou atividade comercial efetiva.

## 3. Produtos e projetos independentes

O GArimpo será desenvolvido como produto independente.

O CRC.SCOUT poderá futuramente utilizar seus serviços por meio de uma integração externa, sem acoplamento técnico obrigatório entre os projetos.

O GArimpo RH será tratado como produto futuro separado, com requisitos, ambientes e critérios próprios.

A arquitetura deverá permitir expansão, mas não deverá incorporar funcionalidades comerciais que ainda não pertencem ao escopo do GArimpo 1.0.

As integrações do TSE e pesquisas relacionadas à transparência política permanecerão privadas e exclusivas ao GArimpo-Master durante o desenvolvimento.

Essas integrações não serão fontes públicas dos ambientes comerciais do GArimpo 1.0.

Um eventual módulo de transparência e fiscalização política será desenvolvido em projeto próprio da CÍVICA.

## 4. Princípios arquiteturais

A plataforma será organizada em torno de um núcleo central de inteligência, independente dos provedores de informação.

Os princípios fundamentais serão:

- Separação entre interface, processamento, conectores e armazenamento.
- Independência entre ambientes comerciais.
- Reutilização de funcionalidades comuns.
- Integração de fontes por conectores independentes.
- Privacidade e isolamento dos clientes.
- Rastreabilidade das informações.
- Validação das evidências.
- Qualidade acima da quantidade de resultados.
- Evolução incremental.
- Ausência de dependência estrutural de um único provedor.

A inclusão de uma nova fonte não deverá exigir a reconstrução do núcleo central.

A inclusão de um novo ambiente deverá reutilizar as funcionalidades compartilhadas, respeitando seus próprios filtros e regras de classificação.

## 5. Núcleo central de inteligência

O núcleo será responsável por coordenar o processo de pesquisa.

Suas responsabilidades serão:

1. Receber a solicitação do usuário.
2. Identificar o ambiente selecionado.
3. Organizar a intenção de pesquisa.
4. Interpretar filtros e critérios.
5. Construir consultas adequadas às fontes disponíveis.
6. Coordenar a execução dos conectores.
7. Receber os resultados.
8. Padronizar as informações.
9. Identificar possíveis perfis individuais.
10. Organizar fontes e evidências.
11. Avaliar correspondências.
12. Identificar possíveis duplicidades.
13. Construir históricos cronológicos.
14. Alimentar o Perfil Inteligente.
15. Apresentar os resultados e relatórios.

O núcleo não deverá depender diretamente da implementação específica de cada fonte.

Os conectores serão responsáveis pela comunicação externa, enquanto o núcleo será responsável pela coordenação, organização e interpretação dos resultados.

## 6. Fluxo de execução de uma pesquisa

O processo completo será dividido em etapas.

### 6.1. Entrada da pesquisa

O usuário seleciona o ambiente e informa:

- Descrição livre.
- Localização.
- Marcas.
- Categorias.
- Palavras-chave.
- Critérios específicos do ambiente.
- Recência desejada.
- Outros filtros disponíveis.

A interface deverá permitir a combinação de descrição livre e filtros estruturados.

### 6.2. Interpretação e organização

O sistema deverá transformar a solicitação em critérios organizados.

Deverá identificar:

- Objetivo principal.
- Termos relevantes.
- Critérios obrigatórios.
- Critérios complementares.
- Recorte geográfico.
- Recorte temporal.
- Tipos de manifestações procuradas.
- Fontes compatíveis.

A interpretação não poderá alterar a intenção original do usuário sem preservar os critérios informados.

### 6.3. Preparação das consultas

O sistema deverá gerar consultas específicas para cada fonte.

As consultas deverão considerar as características técnicas e os recursos efetivamente disponibilizados por cada provedor.

A preparação de uma pesquisa não deverá ser confundida com sua execução.

O status `preparada` indicará que os critérios foram organizados, mas não que os resultados já foram coletados.

### 6.4. Execução das pesquisas

O executor será responsável por acionar os conectores habilitados.

Cada fonte deverá ser consultada de maneira independente, respeitando:

- Permissões.
- Limites de utilização.
- Disponibilidade.
- Condições técnicas.
- Custos.
- Políticas de acesso.

O executor deverá permitir resultados parciais quando uma ou mais fontes estiverem indisponíveis.

A falha de uma integração não deverá comprometer os resultados obtidos por outras fontes.

### 6.5. Tratamento dos resultados

Os resultados recebidos deverão ser organizados em um formato padronizado.

O tratamento poderá incluir:

- Normalização de campos.
- Identificação de autores.
- Recuperação de perfis individuais.
- Identificação de publicações relacionadas.
- Associação de fontes.
- Organização de evidências.
- Verificação de datas.
- Identificação de informações ausentes.
- Identificação de possíveis duplicidades.

A origem de cada informação deverá ser preservada.

### 6.6. Análise de correspondência

O sistema deverá avaliar a relação entre os resultados encontrados e os critérios da pesquisa.

A classificação utilizará os seguintes níveis:

- `confirmada`
- `provavel`
- `possivel`
- `nao_verificada`

A classificação deverá ser acompanhada de justificativa e evidências.

Um perfil acessível não significa identidade confirmada.

Uma publicação relacionada a uma marca não comprova, isoladamente, atividade comercial.

A classificação deverá ser explicável e proporcional à qualidade das informações disponíveis.

### 6.7. Apresentação

O usuário receberá resultados organizados, com identificação dos perfis e acesso às respectivas evidências.

A apresentação deverá destacar:

- Nome ou identificação pública.
- Link direto do perfil individual.
- Plataforma.
- Descrição.
- Classificação.
- Grau de correspondência.
- Fontes consultadas.
- Publicações relacionadas.
- Datas disponíveis.
- Histórico recente.
- Limitações e divergências.

O sistema deverá distinguir informações encontradas, não encontradas e não verificadas.

## 7. Arquitetura dos conectores

Os conectores serão módulos independentes responsáveis por consultar fontes externas.

Cada conector deverá possuir:

- Identificação da fonte.
- Configuração própria.
- Parâmetros de consulta.
- Tratamento de respostas.
- Padronização de dados.
- Controle de erros.
- Registro de execução.
- Respeito aos limites de utilização.

O núcleo de inteligência não deverá depender de detalhes específicos de APIs externas.

### 7.1. Bluesky

O Bluesky já possui uma integração funcional para pesquisa de publicações públicas.

O conector `lib/conectores/bluesky.ts` utiliza a API pública de pesquisa de publicações.

A rota `app/api/fontes/bluesky/route.ts` permite receber uma consulta e retornar resultados estruturados.

Essa integração permite recuperar publicações e identificar seus autores, incluindo referências aos perfis individuais.

Seu uso deverá considerar as limitações da fonte:

- A descoberta ocorre a partir de publicações.
- A presença de um autor não comprova sua identidade civil.
- A publicação não comprova necessariamente atividade comercial atual.
- A disponibilidade de dados depende das informações fornecidas pela plataforma.

A integração deverá evoluir para alimentar o formato padronizado de resultados do GArimpo.

### 7.2. Google

O Google será utilizado como mecanismo de descoberta por consultas externas.

O módulo `lib/conectores/consultas-web.ts` já prepara consultas especializadas conforme o ambiente e os critérios informados.

A geração de links de pesquisa não representa coleta automática.

A evolução dessa integração poderá utilizar provedores de pesquisa com APIs autorizadas, permitindo recuperar resultados estruturados e alimentar o executor.

O provedor deverá ser escolhido considerando custo, qualidade, permissões e capacidade de integração.

### 7.3. Outras fontes

Novas fontes poderão ser incorporadas mediante conectores independentes.

A inclusão dependerá de avaliação técnica, disponibilidade, qualidade, permissões e viabilidade econômica.

A existência de um conector não significa que todas as funcionalidades da fonte estejam implementadas ou disponíveis.

### 7.4. Catálogo de fontes

O catálogo de fontes deverá informar:

- Identificador.
- Nome.
- Tipo.
- Ambientes compatíveis.
- Situação da integração.
- Disponibilidade.
- Requisitos de acesso.

Deverá distinguir fontes catalogadas, fontes em validação e fontes efetivamente integradas.

Uma fonte listada não deverá ser apresentada como executável quando ainda não possuir integração funcional.

## 8. Identificação de perfis individuais

O principal valor comercial do GArimpo será a identificação de perfis individuais reais e verificáveis.

Os resultados deverão priorizar:

- Pessoas identificáveis em fontes públicas.
- URLs diretas dos perfis.
- Publicações relacionadas à pesquisa.
- Evidências que sustentem a correspondência.
- Datas de publicação e consulta.
- Informações profissionais disponibilizadas publicamente, quando existentes.

O sistema não deverá substituir perfis individuais por páginas genéricas, diretórios ou resultados sem identificação.

Os contatos profissionais serão complementares e opcionais.

WhatsApp, telefone e e-mail somente deverão ser apresentados quando efetivamente encontrados em fontes apropriadas e autorizadas.

A ausência de um contato não deverá invalidar um perfil relevante.

O sistema deverá diferenciar:

- Link encontrado.
- Perfil acessível.
- Identidade confirmada.
- Correspondência provável.
- Correspondência possível.
- Informação insuficiente.

Não serão inventados nomes, URLs, contatos ou informações para completar resultados.

## 9. Tratamento, deduplicação e qualidade

O GArimpo deverá evitar resultados repetidos e associações indevidas.

A deduplicação deverá considerar múltiplos elementos, como:

- Identificador público da plataforma.
- URL do perfil.
- Nome público.
- Publicações relacionadas.
- Outros elementos verificáveis.

Nomes semelhantes não serão suficientes para unir registros.

Quando não houver elementos suficientes para confirmar que dois registros pertencem à mesma pessoa, eles deverão permanecer separados ou identificados como correspondências possíveis.

A qualidade dos resultados deverá prevalecer sobre o volume.

O sistema não deverá ampliar critérios artificialmente para atingir uma quantidade predeterminada de resultados.

## 10. Perfil Inteligente

O Perfil Inteligente será uma funcionalidade central e compartilhada entre os ambientes.

Sua finalidade será transformar os resultados encontrados em informações organizadas, contextualizadas e compreensíveis.

Cada perfil poderá conter:

### 10.1. Identificação

- Nome ou identificação pública.
- Categoria.
- Localização pública, quando disponível.
- Plataforma.
- URL direta.
- Referências relacionadas.

### 10.2. Resumo inteligente

Síntese das informações encontradas, distinguindo fatos observados, declarações publicadas e interpretações.

### 10.3. Histórico público

Organização cronológica de publicações e acontecimentos relacionados, com datas e fontes.

O sistema deverá distinguir atividade recente de registros antigos.

A ausência de evidências recentes deverá ser apresentada explicitamente.

### 10.4. Atuação e características

Informações relacionadas ao ambiente selecionado.

No ambiente Consumidores, poderão ser organizadas manifestações públicas relacionadas a produtos, interesses e recomendações.

No ambiente Profissionais, poderão ser organizadas evidências de atuação comercial, divulgação de produtos, revenda e interesse público em iniciar atividade.

### 10.5. Conexões públicas

Organização de relações demonstradas por informações públicas.

O sistema não deverá presumir vínculos pessoais, profissionais ou comerciais sem evidências.

### 10.6. Fontes e evidências

Cada informação relevante deverá preservar:

- Nome da fonte.
- URL.
- Data de publicação ou referência.
- Data de consulta.
- Trecho ou descrição da evidência.

### 10.7. Análise de correspondência

O perfil deverá apresentar:

- Critérios atendidos.
- Evidências relacionadas.
- Correspondências.
- Divergências.
- Informações ausentes.
- Pontos que necessitam de confirmação.

### 10.8. Participação da inteligência artificial

A IA poderá:

- Organizar informações.
- Resumir publicações.
- Identificar recorrências.
- Construir cronologias.
- Relacionar evidências.
- Explicar correspondências.
- Elaborar relatórios.

A IA não poderá inventar dados, completar informações por suposição ou apresentar interpretações como fatos confirmados.

## 11. Fontes, evidências e rastreabilidade

Toda informação factual apresentada deverá preservar sua origem.

A estrutura de resultados deverá permitir relacionar:

- Resultado individual.
- Fonte.
- Evidência.
- Evento histórico.
- Perfil Inteligente.
- Pesquisa que originou a descoberta.

As evidências deverão ser identificáveis e verificáveis.

A data de consulta deverá ser preservada mesmo quando a data original de publicação não estiver disponível.

A ausência de data de publicação não deverá ser substituída pela data de consulta.

O sistema deverá distinguir claramente a data do acontecimento, a data da publicação e a data em que a informação foi consultada, quando esses elementos estiverem disponíveis.

## 12. Execução e estados das pesquisas

O sistema deverá acompanhar a execução por estados definidos:

- `pendente`
- `executando`
- `concluida`
- `parcial`
- `sem_resultados`
- `erro`

A preparação da pesquisa será uma etapa distinta da execução.

O executor deverá registrar:

- Identificador da pesquisa.
- Usuário responsável.
- Ambiente.
- Solicitação original.
- Critérios aplicados.
- Fontes consultadas.
- Início e conclusão.
- Quantidade de resultados.
- Situação final.
- Mensagens de execução.

Resultados parciais deverão preservar as fontes que responderam e aquelas que apresentaram falhas.

A ausência de resultados não deverá ser confundida com indisponibilidade de uma fonte.

## 13. Arquitetura tecnológica

A plataforma utilizará inicialmente:

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- GitHub para versionamento.
- Vercel para publicação.
- Supabase para autenticação, banco de dados e políticas de acesso.

As integrações externas serão executadas preferencialmente no servidor.

A arquitetura deverá manter separação entre:

1. Interface.
2. Organização das pesquisas.
3. Executor central.
4. Conectores de fontes.
5. Tratamento e validação.
6. Perfil Inteligente.
7. Persistência e histórico.
8. Administração e segurança.

O Supabase será parte da arquitetura de produção, não apenas uma possibilidade futura.

A estrutura deverá utilizar autenticação individual, relacionamentos por identificador de usuário e políticas de Row Level Security.

Credenciais privilegiadas deverão permanecer exclusivamente no servidor.

## 14. Arquitetura multiusuário

O GArimpo 1.0 será uma plataforma multiusuário.

Cada usuário deverá possuir dados isolados.

A arquitetura deverá garantir:

- Pesquisas vinculadas ao proprietário.
- Resultados vinculados às respectivas pesquisas.
- Histórico privado.
- Controle de acesso por usuário e papel.
- Limites diários individuais.
- Auditoria de operações relevantes.
- Proteção contra acesso cruzado.

A autorização deverá ser verificada no servidor e reforçada pelas políticas do banco de dados.

O GArimpo-Master terá administração centralizada, sem comprometer o isolamento dos dados dos clientes.

As regras detalhadas de autenticação e segurança estão especificadas em `docs/AUTENTICACAO_E_SEGURANCA.md`.

## 15. Limites de utilização e controle operacional

Cada usuário terá um limite diário individual definido pelo Master.

A renovação ocorrerá automaticamente à meia-noite, considerando `America/Sao_Paulo`.

O consumo deverá ser contabilizado no servidor, de forma consistente e protegida contra solicitações simultâneas.

O Master poderá consultar e alterar limites.

O usuário comum poderá acompanhar seu próprio consumo e sua quantidade restante.

O controle de utilização deverá fazer parte da execução das pesquisas, não apenas da interface.

## 16. GArimpo-Master

O GArimpo-Master será o ambiente administrativo central da plataforma.

Suas funções incluirão:

- Administração de usuários.
- Controle de permissões.
- Definição de limites.
- Consulta de utilização.
- Auditoria.
- Controle de manutenção.
- Administração das configurações gerais.
- Monitoramento das integrações.
- Acompanhamento de falhas.

O acesso será exclusivo ao papel `master`, validado no servidor.

As integrações administrativas e privadas deverão permanecer separadas dos ambientes comerciais.

## 17. Privacidade, LGPD e uso das fontes

O GArimpo deverá observar a legislação aplicável e as condições de utilização das fontes.

Informações públicas não deverão ser consideradas automaticamente livres para qualquer forma de coleta, armazenamento ou reutilização.

A utilização deverá respeitar finalidade, contexto, permissões, termos de uso e princípios da LGPD.

O sistema não deverá produzir dossiês sobre a vida privada das pessoas nem inferir atributos sensíveis.

A apresentação dos resultados deverá ser proporcional à finalidade da pesquisa e sustentada por evidências.

A segurança e a privacidade deverão ser consideradas em todas as etapas da arquitetura.

## 18. Histórico e relatórios

O sistema deverá permitir armazenar e recuperar pesquisas conforme as permissões e políticas de retenção.

O histórico poderá conter:

- Solicitação original.
- Ambiente.
- Critérios aplicados.
- Fontes consultadas.
- Datas.
- Resultados.
- Evidências.
- Situação da execução.
- Identificação do usuário responsável.

Os relatórios deverão apresentar informações organizadas e verificáveis.

A exportação de resultados deverá preservar referências e fontes, evitando que informações percam sua origem ao serem compartilhadas.

## 19. Expansão futura

A arquitetura deverá permitir a inclusão de novos ambientes e fontes sem comprometer o núcleo central.

Novos produtos ou segmentos poderão reutilizar componentes técnicos quando isso fizer sentido, mas deverão manter seus próprios requisitos, permissões e regras de negócio.

A expansão não deverá comprometer:

- Isolamento dos usuários.
- Privacidade.
- Integridade das informações.
- Independência dos ambientes.
- Segurança das integrações.

O GArimpo RH, a integração com CRC.SCOUT e eventuais módulos para outros segmentos serão avaliados como projetos ou integrações específicas.

## 20. Fases de implementação

A evolução do GArimpo 1.0 será incremental.

### Fase 1 — Fundação

- Estrutura dos ambientes comerciais.
- Organização das pesquisas.
- Catálogo de fontes.
- Modelagem padronizada dos resultados.
- Definição do Perfil Inteligente.

### Fase 2 — Execução das fontes

- Estruturação do executor central.
- Integração efetiva com o Bluesky.
- Avaliação e integração de provedores de pesquisa web.
- Padronização das respostas.
- Controle de erros e resultados parciais.

### Fase 3 — Inteligência dos resultados

- Identificação de perfis individuais.
- Associação de evidências.
- Deduplicação.
- Classificação de correspondências.
- Histórico cronológico.
- Construção do Perfil Inteligente.

### Fase 4 — Persistência e segurança

- Supabase Auth.
- Perfis de usuários.
- Banco de dados.
- Políticas RLS.
- Isolamento das pesquisas.
- Limites diários.
- Auditoria.

### Fase 5 — Administração e operação

- Painel GArimpo-Master.
- Gestão de usuários.
- Controle de limites.
- Monitoramento.
- Modo de manutenção.
- Relatórios e histórico.

### Fase 6 — Consolidação comercial

- Testes de segurança.
- Testes de qualidade.
- Avaliação dos custos por pesquisa.
- Ajustes de desempenho.
- Documentação operacional.
- Preparação para clientes.

As fases representam uma sequência de implementação planejada, não uma declaração de que todas as funcionalidades já estejam concluídas.

## 21. Diretriz final

O GArimpo 1.0 deverá ser uma plataforma de inteligência de descoberta capaz de transformar manifestações públicas e fontes autorizadas em resultados individuais organizados, contextualizados e verificáveis.

Seu principal valor não será a quantidade de links apresentados, mas a capacidade de identificar perfis relevantes, demonstrar a origem das informações e explicar por que cada resultado corresponde aos critérios pesquisados.

A plataforma deverá evoluir com independência de fontes, segurança multiusuário, rastreabilidade e qualidade.

**GArimpo**

*Inteligência de busca, descoberta e identificação.*
