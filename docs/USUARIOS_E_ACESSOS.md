# GArimpo — Usuários, Acessos e Administração

## 1. Objetivo

Preparar o GArimpo para operar como uma plataforma multiusuário, permitindo que diferentes usuários utilizem o sistema de forma independente, com pesquisas, resultados, históricos e limites individuais.

A arquitetura deverá garantir segurança, privacidade, rastreabilidade, integridade dos dados e controle centralizado pelo GArimpo-Master.

Este documento define as regras de acesso, administração e utilização da plataforma. As regras deverão ser aplicadas tanto na interface quanto no servidor e no banco de dados.

## 2. Tipos de usuário

A plataforma terá dois papéis principais:

### 2.1. GArimpo-Master

É o ambiente exclusivo do administrador principal da plataforma.

O Master terá permissão para:

- Cadastrar e administrar usuários.
- Ativar, bloquear e reativar contas.
- Definir e alterar limites individuais.
- Consultar o consumo de cada usuário.
- Acompanhar relatórios de utilização.
- Consultar indicadores de custos operacionais.
- Ativar ou desativar fontes de informação.
- Ativar e desativar o modo de manutenção.
- Consultar registros de auditoria.
- Administrar configurações gerais da plataforma.
- Consultar indicadores de funcionamento das integrações.
- Acompanhar falhas, indisponibilidades e utilização dos recursos.
- Administrar parâmetros operacionais permitidos pelo sistema.

O acesso ao Master deverá ser protegido por autenticação e autorização específicas.

### 2.2. Usuário

É o usuário regular da plataforma.

Poderá:

- Acessar seu próprio ambiente.
- Preparar e executar pesquisas, conforme os recursos disponíveis.
- Consultar seus próprios resultados.
- Consultar seu histórico de pesquisas.
- Acompanhar seu consumo diário.
- Visualizar seu limite disponível.
- Consultar as fontes disponibilizadas para seu ambiente.
- Utilizar os recursos autorizados pela plataforma.

Não poderá:

- Alterar o próprio limite.
- Consultar dados de outros usuários.
- Administrar contas.
- Modificar configurações globais.
- Desativar controles de segurança.
- Acessar funções exclusivas do Master.
- Consultar custos internos ou informações administrativas de outros usuários.
- Alterar a propriedade de pesquisas ou resultados.

## 3. Isolamento de dados

Cada usuário deverá possuir um espaço independente.

Pesquisas, resultados, históricos, relatórios e demais registros deverão estar vinculados ao identificador do respectivo usuário.

O isolamento deverá ser garantido no servidor e no banco de dados.

Não será suficiente apenas esconder informações na interface.

Mesmo que alguém tente modificar endereços, parâmetros ou requisições, deverá ser tecnicamente impossível acessar ou alterar dados de outro usuário sem autorização.

O controle será implementado por:

- Autenticação pelo Supabase Auth.
- Identificação do usuário autenticado no servidor.
- Autorização das operações conforme o papel e a situação da conta.
- Políticas de segurança em nível de linha (RLS) no Supabase.
- Verificação de propriedade dos registros.
- Validação dos dados recebidos pelas APIs.

Nenhuma pesquisa, resultado ou histórico poderá ser considerado pertencente a um usuário apenas porque o navegador informou seu identificador.

A propriedade deverá ser determinada pelo servidor, com base na identidade autenticada.

## 4. Autenticação e identificação

A autenticação será realizada pelo Supabase Auth.

Cada usuário terá:

- Identificador único.
- Nome de identificação.
- E-mail de acesso.
- Papel de acesso.
- Situação da conta.
- Data de criação.
- Último acesso, quando disponível.

O papel de cada usuário será definido e controlado pelo sistema.

O usuário comum não poderá alterar seu próprio papel para Master.

A criação e a administração de contas serão funções exclusivas do Master, observadas as regras de segurança da primeira configuração administrativa.

### 4.1. Primeiro acesso do Master

A criação do primeiro Master deverá ocorrer por procedimento administrativo seguro, fora do fluxo de cadastro público.

O sistema não poderá permitir que um usuário comum escolha o papel Master durante o cadastro ou modifique seu próprio papel por requisição.

A atribuição inicial deverá utilizar um procedimento controlado, executado no ambiente administrativo confiável.

### 4.2. Sessões e autenticação

O sistema deverá:

- Validar a sessão nas operações protegidas.
- Impedir acesso a áreas privadas sem autenticação.
- Verificar a autorização no servidor em cada operação sensível.
- Encerrar ou invalidar o acesso conforme as regras de sessão e segurança.
- Não confiar exclusivamente em informações armazenadas no navegador.
- Tratar sessões expiradas e usuários desativados.

A interface poderá apresentar os recursos disponíveis conforme o papel do usuário, mas essa apresentação não substituirá a autorização no servidor.

## 5. Limite diário de utilização

Cada usuário terá um limite individual de utilização.

O limite será configurado exclusivamente pelo GArimpo-Master.

O sistema deverá permitir limites diferentes para usuários diferentes.

Não será necessário estabelecer agora um número fixo de utilizações por dia.

### 5.1. Renovação diária

O limite será renovado automaticamente todos os dias à meia-noite, considerando o horário de Brasília:

`America/Sao_Paulo`

A renovação será calculada pelo servidor com base na data local.

Não dependerá de um processo manual ou de um agendamento externo.

A mudança de data de referência deverá permitir o início de um novo ciclo de utilização, sem apagar o histórico dos ciclos anteriores.

### 5.2. O que será considerado uma utilização

Uma utilização será contabilizada quando o usuário iniciar uma execução efetiva de pesquisa que consuma os recursos operacionais do GArimpo.

A simples preparação de uma pesquisa, edição de filtros ou visualização de resultados existentes não deverá consumir uma nova utilização.

A regra de contabilização deverá ser única e aplicada no servidor.

Tentativas rejeitadas por falta de limite, falta de autorização ou dados inválidos não deverão ser contabilizadas como pesquisas executadas.

### 5.3. Controle de consumo

O consumo deverá ser registrado de forma consistente e associado ao usuário autenticado.

O sistema deverá:

- Verificar o limite antes de iniciar a execução.
- Registrar o consumo no momento definido pela regra de utilização.
- Impedir que duas requisições simultâneas ultrapassem o limite.
- Evitar contabilização duplicada em tentativas repetidas da mesma operação.
- Preservar o histórico diário de utilização.
- Registrar falhas e estados de execução separadamente do consumo.
- Impedir que o usuário altere diretamente seus registros de consumo.

A reserva e a contabilização deverão utilizar operações atômicas no banco de dados ou mecanismo equivalente, para evitar concorrência e inconsistências.

### 5.4. Limite disponível

O usuário poderá visualizar:

- Limite diário configurado.
- Quantidade utilizada.
- Quantidade restante.
- Percentual de utilização.
- Data de referência.
- Horário da próxima renovação.

Essas informações deverão refletir os registros oficiais do servidor.

### 5.5. Alterações de limite

Somente o Master poderá alterar o limite individual.

Toda alteração deverá registrar:

- Usuário afetado.
- Limite anterior.
- Novo limite.
- Administrador responsável.
- Data e horário da alteração.

Uma alteração de limite não deverá apagar ou modificar o consumo já realizado.

## 6. Situação das contas

Cada conta deverá possuir uma situação administrativa:

- `ativo`: usuário autorizado a utilizar os recursos disponíveis.
- `bloqueado`: usuário impedido de executar novas operações.
- `pendente`: usuário ainda não autorizado a utilizar a plataforma.

Somente o Master poderá alterar a situação administrativa de uma conta.

Uma conta bloqueada não poderá iniciar novas pesquisas nem utilizar operações privadas.

O bloqueio deverá ser verificado no servidor, inclusive quando o usuário possuir uma sessão anteriormente válida.

O histórico e os registros da conta deverão ser preservados durante o bloqueio.

A reativação deverá restabelecer o acesso conforme o limite e as permissões vigentes.

## 7. Administração de usuários

O painel Master deverá permitir:

- Visualizar usuários cadastrados.
- Consultar dados básicos de identificação.
- Criar contas.
- Ativar, bloquear e reativar contas.
- Consultar limites individuais.
- Alterar limites.
- Consultar consumo diário.
- Consultar histórico de utilização.
- Identificar contas pendentes.
- Consultar último acesso, quando disponível.

O painel deverá apresentar informações administrativas sem expor senhas, tokens ou credenciais de autenticação.

A administração deverá utilizar operações protegidas no servidor.

O Master não deverá precisar conhecer ou manipular senhas dos usuários.

## 8. Propriedade das pesquisas e resultados

Toda pesquisa deverá possuir identificação de propriedade.

Os registros deverão conter, conforme sua finalidade:

- Identificador da pesquisa.
- Identificador do usuário proprietário.
- Ambiente utilizado.
- Consulta original.
- Filtros aplicados.
- Estado da execução.
- Data de criação.
- Data de conclusão, quando disponível.
- Resultados associados.
- Fontes consultadas.

Os resultados deverão preservar a associação com a pesquisa e o usuário proprietário.

A propriedade deverá ser mantida durante todo o ciclo de vida dos registros, incluindo atualizações, relatórios e histórico.

Um usuário não poderá modificar o identificador de propriedade para assumir registros de outra conta.

O Master poderá consultar dados administrativos e indicadores de utilização conforme suas permissões. O acesso ao conteúdo das pesquisas deverá respeitar as regras de privacidade, finalidade administrativa e auditoria.

## 9. Proteção do banco de dados e RLS

O Supabase será utilizado para autenticação e armazenamento dos dados da plataforma.

As tabelas que armazenarem dados privados deverão possuir políticas RLS adequadas.

As políticas deverão considerar:

- Identidade do usuário autenticado.
- Propriedade do registro.
- Papel de acesso.
- Tipo de operação.
- Necessidade de autorização administrativa.

As operações de leitura, inserção, atualização e exclusão deverão ser protegidas individualmente.

Não será suficiente criar uma política que permita todas as operações para qualquer usuário autenticado.

O usuário comum deverá acessar somente os registros que lhe pertencem.

O Master terá permissões administrativas específicas, sem depender de uma identificação enviada pelo navegador.

A chave `service_role` do Supabase deverá permanecer exclusivamente no servidor, em variável de ambiente protegida. Nunca poderá ser incluída no código público ou enviada ao navegador.

Qualquer operação administrativa que utilize privilégios elevados deverá validar previamente a identidade e a autorização do Master no servidor.

## 10. Proteção das APIs e operações

Todas as rotas que executarem pesquisas ou acessarem dados privados deverão verificar autenticação e autorização.

Antes de executar uma operação protegida, o servidor deverá validar:

1. Se existe usuário autenticado.
2. Se a conta está ativa.
3. Se o usuário possui permissão para a operação.
4. Se a plataforma não está impedindo a operação por manutenção.
5. Se o limite diário permite a execução, quando aplicável.
6. Se os parâmetros recebidos são válidos.
7. Se os registros acessados pertencem ao usuário ou estão dentro de uma autorização administrativa legítima.

As rotas não poderão depender de controles existentes somente na interface.

A chamada direta a uma API não poderá contornar autenticação, limites ou permissões.

Erros de autorização deverão impedir a operação sem revelar informações privadas ou detalhes internos desnecessários.

## 11. Fontes de informação e integrações

O Master poderá administrar a disponibilidade das fontes de informação.

O sistema deverá distinguir:

- Fonte cadastrada no catálogo.
- Fonte habilitada para utilização.
- Integração efetivamente implementada.
- Integração operacional.
- Integração temporariamente indisponível.

A presença de uma fonte no catálogo não significa que exista coleta automática ou integração funcional.

O Master poderá habilitar ou desabilitar fontes conforme o estágio de desenvolvimento e a política comercial.

A desativação de uma fonte deverá impedir novas utilizações daquela integração, sem apagar os resultados históricos já registrados.

Integrações privadas e administrativas, incluindo as relacionadas ao TSE, permanecerão exclusivas ao GArimpo-Master durante o desenvolvimento e não serão disponibilizadas nos ambientes comerciais gerais do GArimpo 1.0.

## 12. Indicadores de custos operacionais

O painel Master deverá permitir acompanhar os custos operacionais da plataforma, conforme a disponibilidade dos dados.

Poderão ser acompanhados:

- Volume de pesquisas executadas.
- Quantidade de chamadas por integração.
- Consumo de serviços externos.
- Custos estimados por fonte.
- Custos efetivamente informados pelos provedores.
- Falhas e tentativas de execução.
- Evolução do consumo ao longo do tempo.

Os valores deverão ser identificados como estimados ou efetivos.

O sistema não deverá apresentar estimativas como custos confirmados.

Esses indicadores serão administrativos e não deverão expor credenciais ou informações privadas de outros usuários.

## 13. Modo de manutenção

O Master poderá ativar ou desativar o modo de manutenção.

Quando ativado:

- Usuários comuns não poderão iniciar novas pesquisas.
- Operações que consumam recursos deverão ser bloqueadas.
- O sistema deverá apresentar uma mensagem informativa.
- Os registros existentes deverão permanecer preservados.
- O acesso administrativo do Master deverá continuar disponível.
- Operações essenciais de segurança e administração deverão continuar funcionando.

O modo de manutenção deverá ser verificado no servidor, não apenas na interface.

A configuração deverá registrar quem realizou a alteração e quando ela ocorreu.

A manutenção não deverá apagar pesquisas, resultados, históricos ou consumo.

## 14. Auditoria e rastreabilidade

O sistema deverá manter registros de operações administrativas e eventos relevantes de segurança.

A auditoria deverá contemplar, entre outros:

- Criação de usuários.
- Alteração de papéis e permissões.
- Ativação e bloqueio de contas.
- Alteração de limites.
- Ativação e desativação de fontes.
- Ativação e desativação da manutenção.
- Alterações de configurações globais.
- Acessos administrativos relevantes.
- Tentativas de operações não autorizadas.
- Eventos relevantes de execução e consumo.

Cada registro deverá conter, quando aplicável:

- Identificador do evento.
- Administrador ou usuário responsável.
- Tipo de operação.
- Registro ou recurso afetado.
- Descrição da alteração.
- Data e horário.
- Valores anteriores e posteriores, quando necessários.

Os usuários comuns não poderão modificar ou apagar registros de auditoria.

Os registros de auditoria deverão evitar armazenar senhas, tokens, chaves de API ou outros segredos.

## 15. Privacidade e proteção das pesquisas

As pesquisas realizadas pelos usuários serão privadas.

O fato de uma pesquisa utilizar informações disponíveis publicamente não torna pública a pesquisa, seus filtros, seus resultados organizados ou o histórico do usuário.

Cada conta deverá ter seus dados protegidos contra acesso por outras contas.

O sistema deverá observar a LGPD e os princípios de finalidade, necessidade, adequação, segurança e transparência.

A coleta, organização e utilização de informações deverão respeitar a natureza dos dados, o contexto de publicação, as permissões aplicáveis e a finalidade legítima do serviço.

Não deverão ser criados perfis de vida privada, inferências sensíveis ou conclusões sem evidências suficientes.

## 16. Retenção, exclusão e recuperação de dados

A plataforma deverá prever políticas de retenção e exclusão de dados.

A exclusão de uma conta não deverá ocorrer de forma improvisada ou apagar registros necessários à integridade operacional, auditoria ou cumprimento de obrigações legais.

Deverão ser definidos procedimentos para:

- Encerramento de contas.
- Exclusão ou anonimização de dados, quando aplicável.
- Preservação de registros legalmente necessários.
- Backup do banco de dados.
- Recuperação em caso de falha.
- Controle de acesso aos backups.

A política definitiva de retenção deverá ser documentada antes da operação comercial em escala.

## 17. Segurança operacional

A plataforma deverá adotar medidas de proteção para evitar abuso e uso indevido.

Entre elas:

- Validação de parâmetros recebidos pelas APIs.
- Proteção contra requisições excessivas.
- Controle de frequência de chamadas.
- Limites de execução e tamanho de respostas.
- Tratamento seguro de erros.
- Proteção de credenciais e variáveis de ambiente.
- Monitoramento de falhas.
- Registro de eventos relevantes.
- Separação entre operações públicas, privadas e administrativas.

Os controles de frequência das APIs deverão complementar os limites diários, não substituí-los.

## 18. Responsabilidades do GArimpo-Master

O Master será responsável pela administração geral da plataforma.

Suas atribuições incluem:

- Gerenciar usuários.
- Definir limites.
- Administrar permissões.
- Controlar disponibilidade das fontes.
- Acompanhar consumo e custos.
- Gerenciar manutenção.
- Consultar auditoria.
- Acompanhar o funcionamento das integrações.
- Preservar a segurança operacional.

O papel Master não deverá ser concedido automaticamente por cadastro, parâmetros enviados pelo navegador ou alterações realizadas por usuários comuns.

Operações administrativas deverão ser rastreáveis.

## 19. Princípios obrigatórios

A implementação deverá respeitar os seguintes princípios:

1. Cada usuário acessa somente seus próprios dados.
2. O Master possui administração exclusiva.
3. A autorização é validada no servidor.
4. O banco de dados aplica isolamento por RLS.
5. Limites são individuais e controlados pelo Master.
6. A renovação diária considera `America/Sao_Paulo`.
7. O consumo é contabilizado de forma consistente e sem duplicidade.
8. Usuários bloqueados não executam novas operações.
9. A manutenção impede novas pesquisas de usuários comuns.
10. Credenciais e segredos permanecem protegidos.
11. Pesquisas e resultados são privados.
12. Operações administrativas são auditáveis.
13. O histórico de utilização é preservado.
14. Nenhum controle de segurança depende exclusivamente da interface.

## 20. Ordem de implementação

A implementação deverá ocorrer de forma progressiva:

1. Configurar e verificar o Supabase Auth.
2. Criar a estrutura de perfis e papéis.
3. Definir o procedimento seguro para o primeiro Master.
4. Implementar a autorização no servidor.
5. Criar as tabelas de usuários e configurações administrativas.
6. Implementar RLS e isolamento de dados.
7. Implementar o controle de situação das contas.
8. Implementar limites e consumo diário.
9. Proteger as rotas de execução de pesquisas.
10. Vincular pesquisas, resultados e históricos aos usuários.
11. Implementar o painel Master.
12. Implementar gerenciamento de fontes.
13. Implementar manutenção.
14. Implementar auditoria.
15. Implementar indicadores operacionais e custos.
16. Testar isolamento, permissões, concorrência e tentativas de acesso indevido.

Cada etapa deverá ser testada antes de avançar para a seguinte.

## 21. Critérios mínimos de aceitação

A estrutura multiusuário somente deverá ser considerada operacional quando os seguintes testes forem aprovados:

- Um usuário não consegue consultar pesquisas de outra conta.
- Um usuário não consegue alterar a propriedade de um registro.
- Um usuário não consegue modificar seu limite ou papel.
- Um usuário bloqueado não consegue executar pesquisas por chamadas diretas às APIs.
- Um usuário sem limite disponível não consegue iniciar nova execução.
- Requisições simultâneas não ultrapassam o limite.
- Uma mesma operação não gera consumo duplicado indevido.
- A renovação diária respeita o horário de Brasília.
- O Master consegue administrar usuários e limites.
- Um usuário comum não consegue acessar funções administrativas.
- O modo de manutenção bloqueia novas pesquisas de usuários comuns.
- As políticas RLS impedem acesso cruzado entre contas.
- Nenhuma credencial privilegiada é exposta ao navegador.

## 22. Diretriz final

O GArimpo deverá ser construído como uma plataforma multiusuário segura, com ambientes independentes, pesquisas privadas, limites individuais e administração centralizada.

O GArimpo-Master será a autoridade administrativa da plataforma.

A segurança não poderá depender apenas da interface: deverá estar presente na autenticação, nas APIs, nas regras de autorização e no banco de dados.

A privacidade, a rastreabilidade e a integridade das pesquisas serão fundamentos permanentes do produto, não recursos opcionais.
