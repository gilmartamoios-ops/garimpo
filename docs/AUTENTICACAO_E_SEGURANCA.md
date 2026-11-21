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

`
