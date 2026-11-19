# GArimpo — Autenticação e Segurança

## 1. Objetivo

Definir como o GArimpo identificará seus usuários, protegerá os acessos e garantirá que cada pessoa tenha acesso somente aos dados autorizados.

Segurança, privacidade e proteção das pesquisas são fundamentos da plataforma.

## 2. Sistema de autenticação

A autenticação será realizada pelo Supabase Auth.

Cada usuário terá uma identidade individual, vinculada a uma conta autenticada.

O sistema deverá permitir:

- Login com e-mail e senha.
- Encerramento seguro da sessão.
- Recuperação de senha.
- Verificação de sessão.
- Identificação do usuário autenticado.
- Controle de contas ativas e bloqueadas.

A possibilidade de adicionar outros métodos de autenticação poderá ser avaliada futuramente.

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

O identificador interno será a referência para relacionar pesquisas, resultados, limites e históricos.

## 4. Identificação do GArimpo-Master

O administrador principal terá o papel:

`master`

Os usuários comuns terão o papel:

`usuario`

O papel Master será atribuído exclusivamente por procedimento administrativo confiável.

Não poderá ser definido ou alterado pelo próprio usuário.

A autorização será verificada no servidor e, quando aplicável, nas políticas do banco de dados.

Conhecer a rota `/master` não concederá acesso administrativo.

## 5. Prote
