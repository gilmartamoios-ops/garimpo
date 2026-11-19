# GArimpo — Painel de Administração Master

## 1. Objetivo

O GArimpo-Master será o centro de administração e controle da plataforma.

Seu objetivo é permitir que o administrador principal acompanhe e gerencie usuários, utilização, fontes de informação, configurações e funcionamento geral do GArimpo.

O painel será exclusivo do administrador autorizado.

## 2. Acesso

O painel será disponibilizado pela rota:

`/master`

O acesso dependerá de:

- Autenticação válida.
- Conta ativa.
- Papel de acesso `master`.
- Autorização verificada no servidor.

Não será suficiente conhecer o endereço da página para acessar o painel.

Usuários comuns não poderão acessar as funções administrativas, mesmo que tentem manipular a URL ou as requisições.

## 3. Visão geral

A página inicial do Master deverá apresentar indicadores gerais:

- Total de usuários cadastrados.
- Usuários ativos.
- Usuários bloqueados.
- Pesquisas realizadas no dia.
- Consumo total da plataforma.
- Fontes habilitadas.
- Situação operacional da plataforma.
- Estado do modo de manutenção.

Os indicadores deverão ser atualizados a partir dos dados reais do banco de dados.

## 4. Administração de usuários

O Master poderá cadastrar e administrar usuários.

Cada usuário terá:

- Nome.
- E-mail.
- Identificador único.
- Data de cadastro.
- Papel de acesso.
- Situação da conta.
- Limite diário.
- Consumo atual.

### Ações disponíveis

- Criar usuário.
- Editar informações cadastrais.
- Ativar conta.
- Bloquear conta.
- Reativar conta.
- Consultar histórico.
- Alterar limite diário.

O bloqueio de uma conta deverá impedir novas operações, preservando os dados e históricos já existentes.

## 5. Controle de limites

O Master será o único responsável pela definição dos limites individuais.

O painel deverá permitir:

- Definir limite diário.
- Aumentar ou reduzir limite.
- Suspender temporariamente a utilização.
- Consultar o limite atual.
- Consultar a quantidade utilizada.
- Consultar a quantidade restante.

A renovação ocorrerá automaticamente à meia-noite, no horário `America/Sao_Paulo`.

O painel não deverá permitir que o usuário comum altere o próprio limite.

## 6. Relatório de utilização

O Master poderá consultar o consumo individual e geral.

### Informações individuais

- Nome do usuário.
- Limite diário.
- Quantidade utilizada.
- Quantidade restante.
- Percentual consumido.
- Pesquisas realizadas.
- Histórico de utilização.

### Informações gerais

- Consumo total por dia.
- Consumo por usuário.
- Quantidade de pesquisas.
- Evolução da utilização.
- Fontes mais utilizadas.

Os relatórios deverão permitir análise por período.

## 7. Controle de fontes

O Master poderá administrar as fontes cadastradas no GArimpo.

Cada fonte deverá apresentar:

- Nome.
- Categoria.
- Ambiente compatível.
- Forma de acesso.
- Situação.
- Condições de utilização.
- Limites conhecidos.
- Data da última verificação.

O administrador poderá ativar ou desativar uma fonte.

A desativação não deverá apagar resultados anteriores.

## 8. Indicadores de custos

O painel deverá permitir acompanhar os custos operacionais da plataforma.

Mesmo começando exclusivamente com fontes gratuitas e públicas, a estrutura deverá estar preparada para registrar custos futuros.

Os indicadores poderão incluir:

- Custo por fonte.
- Custo por pesquisa.
- Custo por usuário.
- Custo operacional diário.
- Custo operacional mensal.

Nesta fase, os indicadores terão finalidade administrativa e de planejamento.

Não haverá cobrança automática, processamento de pagamentos ou contratação de serviços pagos.

## 9. Modo de manutenção

O painel terá um controle global de manutenção.

O Master poderá:

- Ativar a manutenção.
- Desativar a manutenção.
- Definir a mensagem apresentada.
- Consultar quando foi ativada.
- Registrar o motivo da interrupção.

Quando a manutenção estiver ativa:

- Usuários comuns verão uma tela informativa.
- Novas pesquisas ficarão bloqueadas.
- Dados e históricos permanecerão preservados.
- O Master continuará podendo acessar o painel.

## 10. Auditoria administrativa

As ações importantes deverão ser registradas.

Exemplos:

- Cadastro de usuário.
- Bloqueio ou reativação de conta.
- Alteração de limite.
- Ativação ou desativação de fonte.
- Ativação ou encerramento de manutenção.
- Alteração de configurações gerais.

Cada registro deverá identificar:

- Quem realizou a ação.
- Qual ação foi executada.
- Descrição.
- Data e horário.

Os registros de auditoria não poderão ser alterados por usuários comuns.

## 11. Organização visual

O painel deverá utilizar a identidade visual do GArimpo.

A interface seguirá o padrão:

- Fundo escuro.
- Painéis em tons de azul profundo.
- Destaques dourados.
- Tipografia clara.
- Indicadores objetivos.
- Navegação simples.

### Menu administrativo previsto

1. Visão geral.
2. Usuários.
3. Limites e consumo.
4. Pesquisas e relatórios.
5. Fontes de informação.
6. Custos operacionais.
7. Manutenção.
8. Auditoria.
9. Configurações.

## 12. Segurança

Todas as operações administrativas deverão ser protegidas no servidor.

O sistema deverá verificar a autorização do Master antes de executar qualquer alteração.

O painel não poderá depender exclusivamente de controles visuais.

As políticas de segurança do Supabase deverão impedir que usuários comuns executem operações administrativas diretamente no banco.

## 13. Evolução do painel

O desenvolvimento será gradual.

A primeira versão deverá priorizar:

1. Autenticação e acesso exclusivo.
2. Cadastro e administração de usuários.
3. Defini
