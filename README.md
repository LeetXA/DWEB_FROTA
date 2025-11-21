# Sistema de Gestão de Frota – Desenvolvimento Web Avançado

Este projeto foi desenvolvido para a disciplina **Desenvolvimento Web Avançado**, seguindo as diretrizes da proposta oficial.  
O objetivo da aplicação é permitir o gerenciamento de veículos pertencentes a uma empresa, possibilitando operações de **CRUD (Criar, Ler, Atualizar e Excluir)** através de uma interface web integrada a uma API.

---

## ▶️ Como Rodar o Projeto

### 🖥️ 1. Iniciar o Backend

No Codespace, abra o terminal e execute:

```sh
cd gera_frota
cd backend
npm run dev
```
O servidor iniciará na porta 3000.

### 🌐 2. Iniciar o Frontend

Abra outro terminal:
```sh
cd gera_frota
cd frontEnd
npm run dev
```

O GitHub Codespaces irá abrir automaticamente a página de login.

---

## 🚗 Sobre o Sistema

O Sistema de Gestão de Frota permite:

- Login de usuários pré-cadastrados  
- Listagem de todos os veículos cadastrados  
- Busca por ID, modelo ou placa  
- Cadastro de novos veículos (via backend)  
- Atualização individual ou em massa  
- Exclusão de veículos  
- Interface responsiva  
- Integração completa com API Node.js + Express + SQLite + Drizzle ORM  

Cada veículo possui **no mínimo 6 propriedades**, conforme exigido:

- Tipo  
- Marca  
- Modelo  
- Placa  
- Ano de Fabricação  
- KM Atual  
- Combustível  
- Status  
- Responsável  
- Última manutenção  
- Próxima revisão (KM)  
- Validade da documentação  

---

## 🛠️ Tecnologias Utilizadas

### **Frontend (React)**
- React + Vite  
- React Router  
- Axios  
- CSS puro  
- Hooks (useState, useEffect)  

### **Backend (Node.js)**
- Node.js  
- Express  
- SQLite  
- Drizzle ORM  
- CORS  

---

## 📁 Estrutura do Projeto
/frontend
/src
pages/
components/
services/
assets/
vite.config.js

/backend
src/
controllers/
routes/
db/
seed.js
server.js
drizzle.config.mjs
package.json
