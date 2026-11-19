# GArimpo — Usuários, Acessos e Administração

## 1. Objetivo

Preparar o GArimpo para operar como uma plataforma multiusuário, permitindo que diferentes usuários utilizem o sistema de forma independente, com pesquisas, resultados, históricos e limites individuais.

A arquitetura deverá garantir segurança, privacidade, rastreabilidade e controle centralizado pelo GArimpo-Master.

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

Não poderá:

- Alterar o próprio limite.
- Consultar dados de outros usuários.
- Administrar contas.
- Modificar configurações globais.
- Desativar controles de segurança.
- Acessar funções exclusivas do Master.

## 3. Isolamento de dados

Cada usuário deverá possuir um espaço independente.

Pesquisas, resultados, históricos, relatórios e demais registros deverão estar vinculados ao identificador do respectivo usuário.

O isolamento deverá ser garantido no servidor e no banco de dados.

Não será suficiente apenas esconder informações na interface.

Mesmo que alguém tente modificar endereços, parâmetros ou requisições, deverá ser tecnicamente impossível acessar ou alterar dados de outro usuário sem autorização.

O controle será implementado por autenticação, autorização no servidor e políticas de segurança em nível de linha (RLS) no Supabase.

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

A criação e a administração de contas serão funções exclusivas do Master.

## 5. Limite diário de utilização

Cada usuário terá um limite individual de utilização.

O limite será configurado exclusivamente pelo GArimpo-Master.

O sistema deverá permitir limites diferentes para usuários diferentes.

Não será necessário estabelecer agora um número fixo de utilizações por dia.

### 5.1. Renovação diária

O limite será renovado automaticamente todos os dias à meia-noite, considerando o horário de Brasília:

`America/Sao_Paulo`

A renovação será calculada pelo servidor com base na data local.

Não dependerá de um processo manual ou de um agendamento externo
