# To Do APP 

Este é o frontend de um sistema de gerenciamento de tarefas com autenticação JWT, categorizado e paginado. Ele se conecta a uma API RESTful criada com Django REST Framework. A aplicação permite ao usuário:

* Criar conta e realizar login
* Criar, editar, deletar e concluir tarefas
* Filtrar tarefas por status (pendente ou concluída)
* Paginar resultados
* Criar e gerenciar categorias de tarefas

## Tecnologias Utilizadas

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Axios](https://axios-http.com/)
* [React Router DOM](https://reactrouter.com/en/main)
* [CSS Customizado](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

## Estrutura de Pastas

```
/src
  /components
  /pages
    /Dashboard
    /Login
    /Register
    /Categories
  /services
    api.ts
    auth.ts
    task.ts
  /types
    task.ts
  App.tsx
  main.tsx
```

## Funcionalidades

### Autenticação

* Login e registro de usuário com armazenamento do token JWT no `localStorage`.
* Redirecionamento automático após login ou logout.

### Tarefas

* Criação de tarefas com título, descrição e categoria.
* Edição de título e descrição.
* Marcar como concluída ou pendente.
* Exclusão.
* Paginação com controle de páginas.
* Filtro por status: todas, pendentes, concluídas.

### Categorias

* Criação de categorias.
* Exclusão de categorias.
* Associação com tarefas.

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

```bash
npm install
npm run dev
```

## Variáveis de Ambiente

Crie um arquivo `.env` com:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Estilização

Todo o estilo é feito via CSS puro, com foco em:

* Visual moderno e responsivo
* Destaques de status
* Botões com feedback visual
* Layouts bem espaçados

## API Backend (Django)

A aplicação depende de uma API criada com Django REST Framework. Os principais endpoints utilizados incluem:

* `/auth/users/` (registro)
* `/auth/jwt/create/` (login)
* `/tasks/` (CRUD de tarefas)
* `/categories/` (CRUD de categorias)

## Tarefas Futuras

* Edição inline de tarefas e categorias
* Adição de deadlines
* Busca textual
* Upload de anexo na tarefa

## Screenshots

> Pode ser adicionado manualmente prints das telas de login, dashboard, e categorias aqui.

---

Se quiser clonar e testar:

```bash
git clone https://github.com/seu-usuario/task-manager-frontend.git
cd task-manager-frontend
npm install
npm run dev
```

> Backend disponível separadamente na pasta `backend/` ou repositório correspondente.
