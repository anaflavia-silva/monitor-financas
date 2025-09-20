# Monitor de Financas - Projeto Fullstack

Projeto Full Stack desenvolvido para **monitorar entradas e saídas financeiras**, com **dashboard simples e intuitivo**.  
Criado para demonstrar habilidades em **React (Next.js), Node.js e SQLite**.

---

## ✨ Funcionalidades
- Adicionar transações (entrada/saída)  
- Listar transações recentes  
- Excluir transações  
- Resumo financeiro automático (**Entradas, Saídas e Saldo**)  
- Layout moderno e responsivo com TailwindCSS  

---

## Rodando localmente

Requisitos: Node.js (>= 16/18), npm, git.

### Backend
```bash
cd backend
npm install
npm run init-db   # cria db/finance.db com dados de exemplo
npm run dev       # inicia com nodemon
```
O backend ficará em http://localhost:4000 por padrão.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
O frontend (Next.js) ficará em http://localhost:3000.

## Observacoes / resolucao de problemas comuns
- Se `npm run init-db` retornar "Missing script", verifique se voce esta na pasta `backend` e abra o arquivo `backend/package.json` para checar a seção "scripts".
- Se houver erro relacionado a 'type': 'module' ou imports/exports, use a versão CommonJS (o projeto usa require/module.exports).
- Em deploys em nuvem, considere trocar SQLite por PostgreSQL.

## Estrutura do projeto
- backend/: Node + Express + SQLite
- frontend/: Next.js + Tailwind (interface)


