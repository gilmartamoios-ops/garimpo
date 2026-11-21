# GArimpo 1.0 — Autenticação, Segurança e Proteção de Dados

## 1. Objetivo

Definir os princípios, as regras e os mecanismos necessários para identificar usuários, controlar permissões, proteger pesquisas e garantir o isolamento dos dados dentro do GArimpo 1.0.

A segurança não é apenas um requisito técnico. É um dos fundamentos do produto e um diferencial comercial da plataforma.

O GArimpo será uma aplicação multiusuário, na qual diferentes clientes poderão realizar pesquisas sem ter acesso às informações, aos resultados, aos históricos ou às configurações privadas de outros clientes.

Toda a arquitetura deverá respeitar os princípios de:

- Privacidade.
- Isolamento entre usuários.
- Controle de acesso.
- Rastreabilidade.
- Integridade das informações.
- Proteção das pesquisas.
- Uso responsável de fontes públicas e autorizadas.
- Prevenção de acessos indevidos.
- Administração centralizada pelo GArimpo-Master.

## 2. Sistema de autenticação

A autenticação será realizada pelo Supabase Auth.

Cada usuário terá uma identidade individual vinculada a uma conta autenticada.

O sistema deverá permitir:

- Login com e-mail e senha.
- Encerramento seguro da sessão.
- Recuperação de senha.
- Verificação de sessão.
- Identificação do usuário autenticado.
- Controle de contas ativas, bloqueadas e pendentes.
- Proteção das rotas privadas.
- Renovação e encerramento adequado das sessões.

A possibilidade de adicionar outros métodos de autenticação poderá ser avaliada futuramente.

A autenticação deverá ocorrer no servidor sempre que necessária para validar operações protegidas.

A existência de uma sessão no navegador, isoladamente, não deverá ser considerada autorização suficiente para operações administrativas ou acesso a dados privados.

## 3. Identificação dos usuários

Cada conta terá um identificador único fornecido pelo Supabase Auth.

As informações complementares serão mantidas em uma tabela de perfis vinculada ao identificador de autenticação.

O perfil deverá conter:

- Nome.
- E-mail.
- Papel de acesso.
- Situação da conta.
- Data de criação.
- Último acesso, quando disponível.

O identificador interno será a referência para relacionar:

- Pesquisas.
- Resultados.
- Perfis inteligentes.
- Fontes e evidências coletadas.
- Histórico de pesquisas.
- Limites individuais.
- Consumo diário.
- Registros de auditoria.

O identificador do usuário autenticado deverá ser obtido de uma sessão validada no servidor.

O sistema nunca deverá confiar em um identificador de usuário enviado livremente pelo navegador para determinar a propriedade de uma pesquisa ou de seus resultados.

## 4. Identificação do GArimpo-Master

O administrador principal terá o papel:

`master`

Os usuários comuns terão o papel:

`usuario`

O papel Master será atribuído exclusivamente por procedimento administrativo confiável.

Não poderá ser definido ou alterado pelo próprio usuário.

A autorização será verificada no servidor e, quando aplicável, nas políticas do banco de dados.

Conhecer a rota `/master` não concederá acesso administrativo.

O GArimpo-Master será responsável pelo gerenciamento central da plataforma, incluindo:

- Cadastro e administração dos usuários.
- Ativação, bloqueio e desbloqueio de contas.
- Definição e alteração dos limites diários individuais.
- Consulta de indicadores gerais de utilização.
- Controle do modo de manutenção.
- Acompanhamento de falhas operacionais.
- Consulta de registros de auditoria.
- Administração das configurações gerais do sistema.

A interface administrativa deverá ser exclusiva para usuários autenticados e autorizados com papel Master.

Nenhum usuário comum poderá executar operações administrativas, mesmo que tente acessar diretamente os endpoints correspondentes.

## 5. Proteção e isolamento dos dados

O isolamento entre usuários é uma exigência obrigatória do GArimpo 1.0.

Cada usuário deverá ter acesso exclusivamente aos seus próprios dados.

Isso inclui:

- Pesquisas realizadas.
- Resultados encontrados.
- Perfis inteligentes.
- Evidências.
- Histórico de atividades.
- Relatórios.
- Informações de consumo.
- Dados e configurações privadas associados à sua conta.

Um usuário não poderá consultar, modificar, excluir ou obter informações pertencentes a outro usuário.

### 5.1 Identificação de propriedade

Toda pesquisa executada deverá estar vinculada ao identificador do usuário autenticado.

Os resultados e demais registros derivados da pesquisa deverão preservar essa relação.

A propriedade dos dados deverá ser estabelecida no servidor e reforçada por políticas de acesso do banco de dados.

### 5.2 Row Level Security (RLS)

As tabelas que armazenarem informações privadas deverão utilizar políticas de Row Level Security (RLS), conforme sua finalidade.

As políticas deverão garantir que:

- Um usuário autenticado consulte somente registros autorizados.
- Um usuário não altere a propriedade de registros para acessar dados alheios.
- Um usuário não consiga excluir registros de terceiros.
- O Master tenha acesso administrativo conforme regras específicas.
- Operações internas privilegiadas sejam realizadas exclusivamente no servidor.

As políticas deverão ser verificadas também para operações de inserção, atualização e exclusão.

Não será suficiente proteger apenas as consultas de leitura.

### 5.3 Proteção de credenciais

Chaves privilegiadas do Supabase, especialmente a chave de serviço, nunca poderão ser disponibilizadas no navegador.

Credenciais, tokens e segredos de integração deverão permanecer em variáveis de ambiente protegidas no servidor.

Nenhum segredo deverá ser inserido diretamente no código-fonte, em arquivos públicos ou em respostas de API.

## 6. Limites individuais de pesquisa

O GArimpo 1.0 utilizará um sistema de limites diários individualizados.

Cada usuário poderá receber um limite próprio, definido exclusivamente pelo GArimpo-Master.

O limite não será determinado pelo próprio usuário.

### 6.1 Administração dos limites

O Master poderá:

- Definir o limite diário de cada usuário.
- Aumentar ou reduzir o limite.
- Suspender temporariamente a utilização.
- Reativar o limite.
- Consultar o consumo diário.
- Acompanhar a utilização individual.

O usuário comum poderá consultar seu próprio limite e seu consumo, mas não poderá alterá-los.

### 6.2 Renovação diária

Os limites serão renovados automaticamente à meia-noite, considerando o fuso horário:

`America/Sao_Paulo`

A data de referência do consumo deverá respeitar esse fuso horário.

A renovação será diária, sem depender de reinicialização manual ou intervenção do administrador.

O cálculo deverá considerar corretamente as mudanças de data no horário brasileiro.

### 6.3 Consumo de pesquisas

O sistema deverá estabelecer uma regra única e transparente para contabilizar o consumo.

Uma pesquisa será contabilizada conforme a política de execução definida pelo produto, evitando cobranças duplicadas por tentativas, erros técnicos ou atualizações de tela.

A contabilização deverá ocorrer de maneira controlada no servidor.

O sistema deverá impedir que solicitações simultâneas ultrapassem o limite diário por concorrência.

O consumo deverá ser registrado de forma rastreável.

### 6.4 Bloqueio por limite

Quando o usuário atingir seu limite diário:

- Novas pesquisas deverão ser impedidas.
- As pesquisas já iniciadas deverão seguir uma política de conclusão segura.
- O usuário deverá receber uma mensagem clara.
- A utilização será liberada novamente na próxima renovação diária, desde que o limite permaneça ativo.

O Master poderá alterar o limite ou reativar sua utilização.

## 7. Situação das contas

Cada usuário terá um dos seguintes estados:

- `ativo`
- `bloqueado`
- `pendente`

### 7.1 Usuário ativo

Poderá acessar as funcionalidades autorizadas, respeitando seu limite diário.

### 7.2 Usuário bloqueado

Não poderá iniciar novas pesquisas nem acessar funcionalidades privadas protegidas.

A política de bloqueio também deverá impedir o acesso por sessões anteriormente abertas, mediante validação do estado da conta no servidor.

### 7.3 Usuário pendente

Terá acesso restrito até que sua conta seja liberada pelo procedimento administrativo definido.

A alteração da situação de uma conta será uma operação administrativa auditável.

## 8. Proteção das pesquisas e resultados

As pesquisas realizadas pelos usuários representam informações privadas e deverão ser protegidas.

O sistema deverá garantir que:

- Uma pesquisa pertença a um único usuário.
- Seus resultados permaneçam vinculados ao proprietário.
- Os históricos sejam privados.
- Relatórios não sejam compartilhados automaticamente.
- URLs privadas ou identificadores de registros não funcionem como autorização de acesso.
- Consultas de um usuário não sejam utilizadas para responder solicitações de outro usuário.
- Operações administrativas respeitem as permissões do Master.

Os dados não poderão ser disponibilizados publicamente apenas porque foram obtidos a partir de fontes públicas.

A informação encontrada na internet e o resultado privado produzido pelo GArimpo são coisas diferentes.

O fato de uma fonte ser pública não torna pública a pesquisa realizada pelo cliente.

## 9. Proteção das fontes e integrações

As integrações com fontes externas deverão ser executadas por mecanismos controlados pelo servidor.

A interface não deverá receber credenciais privadas nem acessar diretamente serviços que exijam segredos de integração.

As rotas internas deverão:

- Validar os parâmetros recebidos.
- Verificar a sessão e as permissões necessárias.
- Controlar o volume de solicitações.
- Limitar quantidades e tamanhos de respostas.
- Tratar indisponibilidade das fontes.
- Evitar exposição de erros internos.
- Registrar informações operacionais relevantes.

### 9.1 Fontes públicas e autorizadas

O GArimpo deverá respeitar as condições de acesso e utilização das fontes.

A existência de uma informação pública não significa autorização irrestrita para coleta, armazenamento ou reutilização.

A utilização deverá observar:

- Finalidade da pesquisa.
- Contexto em que a informação foi publicada.
- Termos de uso e permissões das plataformas.
- Legislação aplicável.
- Princípios da LGPD.
- Limitações técnicas e operacionais das fontes.

### 9.2 Credenciais e integrações privadas

Tokens, chaves de API e credenciais deverão ser mantidos exclusivamente no ambiente seguro do servidor.

A indisponibilidade de uma fonte não deverá comprometer a segurança ou a integridade das demais integrações.

Cada integração deverá possuir tratamento independente de falhas.

### 9.3 Separação de ambientes

As integrações comerciais do GArimpo 1.0 deverão permanecer separadas de integrações administrativas, experimentais ou destinadas a outros projetos.

As integrações do TSE e demais pesquisas de transparência política deverão permanecer privadas e exclusivas ao GArimpo-Master durante o desenvolvimento.

Essas integrações não deverão ser disponibilizadas como fontes públicas nem aos ambientes comerciais gerais do GArimpo 1.0.

Um eventual aproveitamento dessas bases deverá ocorrer em módulo próprio da CÍVICA, conforme projeto específico.

## 10. Integridade das informações e rastreabilidade

A segurança do GArimpo também envolve a confiabilidade dos resultados.

O sistema não deverá inventar, completar por suposição ou apresentar como verdadeiro qualquer dado pessoal, contato, atividade ou acontecimento sem evidência verificável.

Toda informação factual apresentada deverá preservar, quando disponível:

- Fonte de origem.
- URL direta.
- Data de publicação.
- Data de consulta.
- Evidência ou trecho que sustenta a informação.
- Relação entre a evidência e o perfil encontrado.

O sistema deverá distinguir:

- Fato observado.
- Declaração publicada.
- Interpretação produzida pelo sistema.
- Informação não confirmada.
- Informação não encontrada.

A IA poderá organizar, resumir e relacionar evidências, mas não poderá transformar hipóteses em fatos.

A ausência de uma informação deverá permanecer explícita, sem preenchimento por inferência.

A identificação de pessoas deverá ser cautelosa. Nomes semelhantes ou referências isoladas não serão suficientes para confirmar que duas publicações pertencem à mesma pessoa.

A qualidade e a verificabilidade deverão prevalecer sobre a quantidade de resultados.

## 11. Perfil Inteligente e privacidade

O Perfil Inteligente deverá organizar informações públicas e autorizadas de forma contextualizada e verificável.

Sua finalidade será apresentar conhecimento útil para a pesquisa, preservando as fontes e as limitações das informações encontradas.

Não deverá:

- Criar dossiês sobre a vida privada das pessoas.
- Inferir atributos sensíveis.
- Produzir diagnósticos psicológicos.
- Atribuir características pessoais sem evidência.
- Apresentar especulações como fatos.
- Criar vínculos pessoais ou profissionais não demonstrados.

As conexões públicas deverão ser descritas conforme as evidências disponíveis, sem presumir relações que não foram demonstradas.

Os relatórios deverão apresentar as limitações e o grau de correspondência das informações.

## 12. Auditoria e registros administrativos

O GArimpo deverá manter registros de operações relevantes para segurança, administração e rastreabilidade.

Os registros de auditoria poderão incluir:

- Identificação do usuário responsável.
- Tipo de operação.
- Descrição da ação.
- Data e horário.
- Identificação de quem autorizou ou executou a alteração.
- Resultado operacional, quando aplicável.

Deverão ser auditadas especialmente:

- Criação e alteração de usuários.
- Alterações de papéis.
- Bloqueios e desbloqueios.
- Alterações de limites.
- Ativações e desativações de manutenção.
- Operações administrativas.
- Alterações relevantes nas configurações de segurança.

Os registros de auditoria deverão ser protegidos contra alterações por usuários comuns.

Não deverão armazenar senhas, tokens, chaves secretas ou outros segredos.

## 13. Modo de manutenção

O GArimpo-Master poderá ativar ou desativar o modo de manutenção.

Quando ativado:

- O acesso às funcionalidades de pesquisa deverá ser suspenso para usuários comuns.
- O sistema deverá apresentar uma mensagem informativa.
- O Master deverá continuar podendo acessar as funções administrativas necessárias.
- As operações já iniciadas deverão receber tratamento seguro, sem perda ou corrupção de dados.

A ativação e a desativação deverão ser registradas na auditoria.

O modo de manutenção não deverá ser controlado por usuários comuns nem depender exclusivamente de uma configuração no navegador.

## 14. Proteção das rotas e operações

Todas as rotas que manipulam informações privadas deverão validar a autorização no servidor.

Isso inclui:

- Execução de pesquisas.
- Consulta de resultados.
- Consulta de históricos.
- Geração de relatórios.
- Administração de usuários.
- Alteração de limites.
- Consulta de utilização.
- Configurações administrativas.
- Operações sobre o Perfil Inteligente.

A proteção deverá considerar autenticação, papel, situação da conta e propriedade dos dados.

O sistema deverá aplicar validação de entrada, tratamento de erros e proteção contra solicitações indevidas.

Não deverão existir rotas administrativas acessíveis apenas pela ocultação de botões ou elementos visuais.

## 15. Controle de falhas e disponibilidade

O sistema deverá tratar falhas de forma controlada.

Problemas em uma fonte externa não deverão comprometer os dados já coletados nem provocar perda de pesquisas concluídas.

As pesquisas poderão apresentar os seguintes estados:

- `pendente`
- `executando`
- `concluida`
- `parcial`
- `sem_resultados`
- `erro`

O sistema deverá distinguir ausência de resultados de falha de comunicação.

Resultados parciais deverão preservar a identificação das fontes consultadas e das fontes que não responderam.

Mensagens apresentadas ao usuário não deverão revelar detalhes internos, credenciais ou informações de outros clientes.

## 16. Retenção, exclusão e proteção dos dados

O GArimpo deverá manter uma política de armazenamento compatível com sua finalidade e com a legislação aplicável.

Os dados dos usuários deverão ser mantidos em ambientes protegidos e com acesso controlado.

Deverão ser estabelecidas regras para:

- Retenção de pesquisas.
- Retenção de resultados.
- Armazenamento de evidências.
- Exclusão de dados.
- Atendimento a solicitações dos titulares.
- Backup e recuperação.
- Proteção dos registros de auditoria.

A exclusão de informações deverá respeitar obrigações legais, necessidades legítimas de segurança e políticas de retenção definidas pela plataforma.

Backups também deverão receber proteção adequada e não poderão se tornar uma forma indireta de acesso indevido aos dados.

## 17. Responsabilidades do GArimpo-Master

O GArimpo-Master será a autoridade administrativa da plataforma.

Suas responsabilidades incluem:

- Gerenciar os usuários.
- Definir permissões.
- Administrar limites individuais.
- Controlar o modo de manutenção.
- Acompanhar a utilização.
- Monitorar falhas.
- Administrar integrações autorizadas.
- Consultar auditorias.
- Proteger a operação geral do sistema.

As operações do Master deverão ser autenticadas, autorizadas e auditáveis.

O papel Master não deverá ser concedido por cadastro público, parâmetro de URL, formulário ou alteração realizada pelo próprio usuário.

## 18. Princípios obrigatórios de desenvolvimento

Todo novo módulo ou funcionalidade deverá respeitar as seguintes regras:

1. Nenhum usuário acessa dados de outro usuário.
2. Nenhum usuário comum altera seu próprio papel ou limite.
3. Nenhuma operação administrativa depende apenas da interface.
4. Nenhuma credencial privada é exposta ao navegador.
5. Toda pesquisa possui um proprietário identificado.
6. Toda informação factual deve ter origem verificável.
7. Toda operação sensível deve ser autorizada no servidor.
8. Toda integração externa deve possuir tratamento de falhas.
9. Nenhum dado ausente deve ser inventado.
10. Nenhuma fonte privada do Master será disponibilizada automaticamente aos clientes comerciais.
11. A proteção dos dados deverá existir desde a concepção de cada módulo, e não ser adicionada posteriormente.
12. A arquitetura deverá permitir evolução sem comprometer o isolamento e a segurança dos clientes.

## 19. Evolução e implementação

A implementação da segurança deverá acompanhar a evolução do produto.

A ordem recomendada é:

1. Configurar e validar o Supabase Auth.
2. Estabelecer a tabela de perfis vinculada ao Auth.
3. Implementar os papéis e as permissões.
4. Configurar as políticas RLS.
5. Proteger as rotas privadas.
6. Implementar o isolamento de pesquisas e resultados.
7. Implementar limites e consumo diário.
8. Implementar administração exclusiva do Master.
9. Implementar auditoria.
10. Implementar controle de manutenção.
11. Proteger e integrar o executor de pesquisas.
12. Validar a segurança com testes de acesso entre usuários.
13. Estabelecer procedimentos de backup, recuperação e retenção.

A implementação deverá ser progressiva, testada e documentada.

Nenhuma funcionalidade deverá ser considerada segura apenas porque funciona em uma sessão de teste.

## 20. Diretriz final

O GArimpo 1.0 deverá ser construído como uma plataforma multiusuário de inteligência de descoberta, com privacidade, segurança e rastreabilidade incorporadas à arquitetura.

Cada cliente deverá ter confiança de que suas pesquisas, seus resultados e seus históricos permanecem protegidos.

O GArimpo-Master deverá possuir controle administrativo da plataforma, sem comprometer o isolamento dos clientes.

As informações apresentadas deverão preservar sua origem, suas evidências e suas limitações.

A segurança, a integridade e a confiabilidade não serão funcionalidades opcionais: serão requisitos permanentes de toda a evolução do GArimpo.
