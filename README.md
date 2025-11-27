# PetzInMove

Aplicacao full-stack que integra uma landing page React (Vite + Tailwind + ShadCN UI) com uma API Fastify/Prisma para gerenciar servicos, cadastros e agendamentos de pets.

## Requisitos

- Node.js 18+
- npm

## Configuracao

1. Instale as dependencias nas duas pastas:
   ```bash
   npm install
   cd backend && npm install
   ```
2. Configure variaveis de ambiente:
   - Frontend: copie `.env.example` para `.env` e ajuste `VITE_API_URL` (padrao `http://localhost:5000`).
   - Backend: crie `backend/.env` com, por exemplo:
     ```bash
     DATABASE_URL=file:./dev.db
     SECRET=um_segredo_seguro
     ```
3. Execute as migracoes do Prisma:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## Execucao

### Backend

```bash
cd backend
npm run dev
```

### Frontend

Em outro terminal:

```bash
npm run dev
```

A aplicacao React rodara em `http://localhost:5173` e consumira automaticamente a API definida em `VITE_API_URL`.
