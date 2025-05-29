FROM node:22.15-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl libssl-dev

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

COPY prisma ./prisma

COPY . .

COPY .env .env

RUN pnpm install

RUN npx prisma generate

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
