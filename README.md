# 🥥 CocoTour - Sistema de Turismo

**CocoTour** é um sistema web voltado para o turismo, onde **administradores** podem cadastrar cidades, lugares e eventos, enquanto **usuários** podem pesquisar e visualizar essas informações de forma prática.

---

## ✨ Funcionalidades

### Admin
- Cadastro de cidades turísticas
- Adição de lugares (ex: restaurantes, paisagens, atrações)
- Criação de eventos
- Login via Google ou email/senha
- Controle de autorização para acesso ao sistema

### Usuário
- Pesquisa de cidades
- Visualização de lugares turísticos e eventos cadastrados
- Acesso a fotos, descrições e links como Instagram

---

# 🚀 BACKEND

## 🧰 Tecnologias Utilizadas

- **Node.js + Fastify** – Backend performático
- **Prisma ORM** – Abstração de banco de dados relacional
- **PostgreSQL** – Banco de dados utilizado
- **Zod** – Validação de dados
- **JWT** – Autenticação segura
- **Nodemailer + Redis** – Envio de emails e fila (caso aplicável)
- **Helmet, Rate-limit, CORS, Multipart** – Segurança e controle de requisições

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

git clone https://github.com/seu-usuario/cocotour.git
cd cocotour
cd backend

### 2. Instalar as dependências
pnpm install

### 3. Criar o arquivo .env 
DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
JWT_SECRET="sua_chave_secreta_jwt"
PORT=porta_do_backend
PORTFRONT="http://localhost:porta_do_frontend"
NODE_ENV="development"
GOOGLE_CLIENT_ID="seu_google_client_id"
GMAIL_USER="seu_email_para_envio@gmail.com"
PASSWORD_GMAIL="senha_do_email"
REDIS_URL="redis://localhost:6379" # ou o link do Redis em nuvem


### 4.  Rodar as migrations e gerar o client do Prisma
npx prisma generate
npx prisma migrate dev --name init

### 5.  Rodar a aplicação em modo desenvolvimento
pnpm dev


