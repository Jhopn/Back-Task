# Task App - ToDoList<br>

Descrição do Projeto<br>

Interface de Programação de Aplicação (API) criada para uso do **[Frontend](https://github.com/Guilhermeprog3/Front-Task)**

E essa **[API](https://deploy-task-api.onrender.com/)** está no ar ✈

Deseja ver as rotas rotas? Consulte nossa **[documentação](https://deploy-task-api.onrender.com/api-docs/)**!
### 🛠️ Construído com:

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,prisma,)](https://skillicons.dev)
<br>
Este projeto é uma aplicação web Full Stack desenvolvida com Node, Express e Prisma.<br>



### 🔧Instruções de Instalação e Configuração no Terminal<br>
Clone o Repositório:<br>
`git clone https://github.com/Jhopn/task-api.git`<br>

Entre na pasta da aplicação:<br>
`$ cd task-api`<br>

Instale as Dependências:<br>
`npm install`<br>
`yarn install`<br>

Crie o acesso para administrador e usuário:<br>
`npm run access`<br>

Inicie o Servidor de Desenvolvimento:<br>
`npm run dev`<br>

#### OBS: Certifique-se de que o backend está rodando na URL especificada. <br>

### 📈 Schema <br>
```mermaid
erDiagram
    USER {
        String id PK "id @default(uuid())"
        String username "username"
        String email "email @unique"
        String password "password"
        String avatar "avatar?"
        DateTime createdAt "createdAt @default(now())"
        DateTime updatedAt "updatedAt @updatedAt"
    }
    
    USERACCESS {
        String id PK "id @default(uuid())"
        String userId "userId?"
        String accessId "accessId?"
        DateTime createdAt "createdAt @default(now())"
        DateTime updatedAt "updatedAt @updatedAt"
    }
    
    ACCESS {
        String id PK "id @default(uuid())"
        String name "name @unique"
        DateTime createdAt "createdAt @default(now())"
        DateTime updatedAt "updatedAt @updatedAt"
    }

    TASKS {
        String id PK "id @default(uuid())"
        String title "title"
        String description "description"
        DateTime dueDate "dueDate"
        String status "status @default(INCOMPLETO)"
        String userId "userId"
        DateTime createdAt "createdAt @default(now())"
        DateTime updatedAt "updatedAt @updatedAt"
    }

    USER ||--o{ TASKS : "has"
    USER ||--o{ USERACCESS : "has"
    ACCESS ||--o{ USERACCESS : "has"
    TASKS ||--o| USER : "belongs to"
    USERACCESS }o--|| USER : "belongs to"
    USERACCESS }o--|| ACCESS : "belongs to"

```

 

