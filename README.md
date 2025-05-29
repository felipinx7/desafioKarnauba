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
- **Docker** & **Docker Compose** – Containerização da aplicação e banco de dados
- **JWT** – Autenticação segura
- **Nodemailer + Redis** – Envio de emails e fila (caso aplicável)
- **Helmet, Rate-limit, CORS, Multipart** – Segurança e controle de requisições

---

## 🚀 Como rodar o projeto no backend

### 1. Clonar o repositório

git clone https://github.com/seu-usuario/cocotour.git
</br>
cd cocotour
</br>
cd backend

### 2. Instalar as dependências
pnpm install

### 3. Criar o arquivo .env 
DATABASE_USER=dbuser
</br>
DATABASE_PASS=dbsenha
</br>
DATABASE_DB=dbName
</br>
DATABASE_URL="postgresql://usuario:senha@db:5432/banco"
</br>
JWT_SECRET="sua_chave_secreta_jwt"
</br>
PORT=porta_do_backend
</br>
PORTFRONT="http://localhost:porta_do_frontend"
</br>
NODE_ENV="development"
</br>
GOOGLE_CLIENT_ID="seu_google_client_id"
</br>
GMAIL_USER="seu_email_para_envio@gmail.com"
</br>
PASSWORD_GMAIL="senha_do_email"
</br>
REDIS_URL="redis://localhost:6379" # ou o link do Redis em nuvem

### 4. Rodar com Docker
docker-compose up

### 5.  Rodar as migrations e gerar o client do Prisma com Docker
docker exec -it backend-backend-1 npx prisma generate
docker exec -it backend-backend-1 npx prisma migrate dev --name init

### 6.  Rodar a aplicação em modo desenvolvimento (opcional se quiser rodar sem docker)
pnpm dev

### 7. Para abrir o Prisma Studio (UI do banco) dentro do container:
docker exec -it backend-backend-1 npx prisma studio



