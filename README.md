# To-Do APP

Aplicativo completo de gerenciamento de tarefas com funcionalidades de autenticação, filtro, paginação e categorização. Desenvolvido com **React + TypeScript** no frontend e **Django REST Framework** no backend.

---

## 📊 Visão Geral

Este repositório é estruturado com duas pastas principais:

```
/to-do-app
  /frontend     # React + TypeScript
  /backend      # Django REST Framework
```

---

## 🎓 Requisitos para Executar Localmente

### Backend (Django)

**Requisitos:** Python 3.10+, pip, virtualenv

```bash
cd to-do-app/backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Crie um arquivo `.env` com as seguintes variáveis:

```
SECRET_KEY=your_secret_key
DB_NAME=todo_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

> Obs: você pode usar SQLite para testes rápidos, basta ajustar o `settings.py`.

### Frontend (React + TypeScript)

**Requisitos:** Node.js 18+

```bash
cd to-do-app/frontend
npm install
npm run dev
```

A aplicação React estará disponível em `http://localhost:5173`.

---

## 📂 Estrutura de Pastas (Frontend)

```
/src
  /components       # Componentes reutilizáveis
  /pages            # Páginas principais
    /Dashboard
    /Login
    /Register
    /Categories
  /services         # Serviços de API
    api.ts
    auth.ts
    task.ts
  /types            # Tipagens TypeScript
    task.ts
  App.tsx
  main.tsx
```

---

## 😐 Funcionalidades

### 🔐 Autenticação (JWT)

* Registro de conta e login
* Armazenamento de token JWT no localStorage
* Proteção de rotas e redirecionamento automático

### ✅ Tarefas

* CRUD de tarefas (título, descrição, categoria)
* Marcar como concluída ou pendente
* Paginação e filtragem por status

### 📂 Categorias

* Criar e excluir categorias
* Associar tarefas a categorias

---

## 🎓 Backend - Endpoints REST

Principais rotas da API (Django REST Framework):

```
POST   /auth/users/           # Registro
POST   /auth/jwt/create/      # Login
GET    /tasks/                # Listar tarefas (com paginação)
POST   /tasks/                # Criar tarefa
PATCH  /tasks/<id>/           # Atualizar tarefa
DELETE /tasks/<id>/           # Deletar tarefa
GET    /categories/           # Listar categorias
POST   /categories/           # Criar categoria
```

---

## 📄 Arquivo requirements.txt (Backend)

```txt
django
djangorestframework
django-cors-headers
django-environ
mysqlclient
```

---

Qualquer dúvida ou sugestão, estou à disposição.

---
