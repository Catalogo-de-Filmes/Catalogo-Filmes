# Catálogo de Filmes - Projeto Full Stack (MPNERC)

Este é um projeto de site de catálogo de filmes desenvolvido por uma equipe de 5 desenvolvedores júnior, utilizando a stack **MPNERC**:

* **M**ySQL (banco de dados relacional, hospedado no Railway)
* **P**risma (ORM para Node.js)
* **N**ode.js (JavaScript backend)
* **E**xpress (framework web para Node)
* **R**eact (frontend SPA)
* **C**loudinary (armazenamento de imagens)

---

## 🧪 Requisitos para rodar o projeto localmente

* Node.js (última versão LTS)
* Git
* Conta gratuita no [Railway](https://railway.app) para acesso ao banco MySQL remoto

---

## ⚙️ Configuração do Ambiente Local

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/catalogo-filmes.git
cd catalogo-filmes
```

### 2. Instalar dependências

#### Backend:

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com a DATABASE_URL fornecida pelo Railway
npx prisma generate
npx prisma db push
npm run dev
```

#### Frontend:

```bash
cd ../frontend
npm install
cp .env.example .env
# Edite o .env com a URL da API (ex: http://localhost:3001)
npm run dev
```

---

## 🧾 Arquivos .env

### backend/.env.example

```env
DATABASE_URL="mysql://usuario:senha@host.railway.app:PORTA/railway"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
PORT=3001
```

### frontend/.env.example

```env
VITE_API_URL=http://localhost:3001
```

---

## 🚀 Scripts úteis

### Backend

* `npm run dev` → Inicia o servidor com hot reload (nodemon)
* `npx prisma generate` → Gera o client do Prisma
* `npx prisma db push` → Envia o schema atual ao banco no Railway

### Frontend

* `npm run dev` → Inicia o servidor React (Vite)

---

## 🔐 Segurança

* Nunca suba o arquivo `.env` para o GitHub
* Use apenas `.env.example` no repositório público
* Armazene suas senhas e chaves em segurança

---

## ✨ Licença

Este projeto é livre para uso educacional. Compartilhe conhecimento! 🚀
