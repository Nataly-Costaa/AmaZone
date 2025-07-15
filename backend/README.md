# 🌿 AmaZone - API sobre a Amazônia

## 🧭 Sobre o Projeto

**AmaZone** é uma API RESTful desenvolvida com o propósito de disseminar informações valiosas sobre a **Amazônia**, sua biodiversidade, ameaças e curiosidades.  
Essa API foi criada como parte de um projeto educacional, visando demonstrar na prática o uso de tecnologias modernas para construção de aplicações backend seguras, organizadas e escaláveis.

> A floresta Amazônica é um patrimônio natural do planeta. Nosso objetivo é valorizar seu conhecimento e promover a conscientização por meio da tecnologia.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia         | Versão         |
|--------------------|----------------|
| Node.js            | ^18.x          |
| Express            | ^5.1.0         |
| Prisma ORM         | ^6.7.0         |
| PostgreSQL (Neon)  | Online DB      |
| JWT + Cookies      | ^9.0.2         |
| bcryptjs           | ^3.0.2         |
| Zod (validação)    | ^4.0.5         |
| Jest               | ^29.7.0        |
| uuid               | ^11.1.0        |
| CORS               | ^2.8.5         |

---

## 📁 Estrutura de Rotas
### 🔐 Autenticação e Usuários (/users)
- POST /users/cadastrar – Cadastro de novo usuário (público)

- GET /users – Listar todos os usuários (privado)

- PUT /users/atualizar/:id – Atualizar um usuário (privado)

- DELETE /users/deletar/:id – Excluir um usuário (privado)

### 🌱 Plantas da Amazônia (/plantas)
- GET /plantas – Listar plantas

- POST /plantas/cadastrar – Cadastrar planta

- PATCH /plantas/atualizar/:id – Atualizar planta

- DELETE /plantas/deletar/:id – Deletar planta

### 🐾 Animais da Amazônia (/animal)
- GET /animal – Listar animais

- POST /animal/criar – Cadastrar animal

- PUT /animal/atualizar/:id – Atualizar animal

- DELETE /animal/deletar/:id – Excluir animal

### 💡 Curiosidades (/curiosidades)
- GET /curiosidades – Listar curiosidades

- GET /curiosidades/:id – Buscar por ID

- POST /curiosidades/criar – Cadastrar curiosidade

- PUT /curiosidades/atualizar/:id – Atualizar curiosidade

- DELETE /curiosidades/deletar/:id – Deletar curiosidade

### ⚠️ Ameaças Ambientais (/threat)
- GET /threat – Listar ameaças

- GET /threat/:id – Buscar por ID

- POST /threat – Cadastrar ameaça

- PUT /threat/:id – Atualizar ameaça

- DELETE /threat/:id – Deletar ameaça



---

## 📦 Passo a Passo para Execução Local
**1. Clone o repositório:**

```bash
git clone https://github.com/Nataly-Costaa/AmaZone.git
```

**2. Entre na pasta:**
```bash
cd amazone
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Configure o arquivo .env:**
```bash
DATABASE_URL="postgresql://usuario:senha@host:porta/db"
BACKEND_PORT=PORTA DO BACKEND

NODE_ENV=development

JWT_SECRET="chave_secreta_segura"

FRONTEND_URL="url_frontend"
```

**5. Execute as migrações Prisma:**
```bash
npm run prisma:migrate
npm run prisma:generate
```

**6. Inicie o servidor:**
```bash
npm run dev
```

## 📷 Imagens do Projeto
![Descrição da imagem](./caminho/da/imagem.png)# 🌿 AmaZone - API sobre a Amazônia

## 🧭 Sobre o Projeto

**AmaZone** é uma API RESTful desenvolvida com o propósito de disseminar informações valiosas sobre a **Amazônia**, sua biodiversidade, ameaças e curiosidades.  
Essa API foi criada como parte de um projeto educacional, visando demonstrar na prática o uso de tecnologias modernas para construção de aplicações backend seguras, organizadas e escaláveis.

> A floresta Amazônica é um patrimônio natural do planeta. Nosso objetivo é valorizar seu conhecimento e promover a conscientização por meio da tecnologia.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia         | Versão         |
|--------------------|----------------|
| Node.js            | ^18.x          |
| Express            | ^5.1.0         |
| Prisma ORM         | ^6.7.0         |
| PostgreSQL (Neon)  | Online DB      |
| JWT + Cookies      | ^9.0.2         |
| bcryptjs           | ^3.0.2         |
| Zod (validação)    | ^4.0.5         |
| Jest               | ^29.7.0        |
| uuid               | ^11.1.0        |
| CORS               | ^2.8.5         |

---

## 📁 Estrutura de Rotas
### 🔐 Autenticação e Usuários (/users)
- POST /users/cadastrar – Cadastro de novo usuário (público)

- GET /users – Listar todos os usuários (privado)

- PUT /users/atualizar/:id – Atualizar um usuário (privado)

- DELETE /users/deletar/:id – Excluir um usuário (privado)

### 🌱 Plantas da Amazônia (/plantas)
- GET /plantas – Listar plantas

- POST /plantas/cadastrar – Cadastrar planta

- PATCH /plantas/atualizar/:id – Atualizar planta

- DELETE /plantas/deletar/:id – Deletar planta

### 🐾 Animais da Amazônia (/animal)
- GET /animal – Listar animais

- POST /animal/criar – Cadastrar animal

- PUT /animal/atualizar/:id – Atualizar animal

- DELETE /animal/deletar/:id – Excluir animal

### 💡 Curiosidades (/curiosidades)
- GET /curiosidades – Listar curiosidades

- GET /curiosidades/:id – Buscar por ID

- POST /curiosidades/criar – Cadastrar curiosidade

- PUT /curiosidades/atualizar/:id – Atualizar curiosidade

- DELETE /curiosidades/deletar/:id – Deletar curiosidade

### ⚠️ Ameaças Ambientais (/threat)
- GET /threat – Listar ameaças

- GET /threat/:id – Buscar por ID

- POST /threat – Cadastrar ameaça

- PUT /threat/:id – Atualizar ameaça

- DELETE /threat/:id – Deletar ameaça



---

## 📦 Passo a Passo para Execução Local
**1. Clone o repositório:**

```bash
git clone https://github.com/Nataly-Costaa/AmaZone.git
```

**2. Entre na pasta:**
```bash
cd amazone
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Configure o arquivo .env:**
```bash
DATABASE_URL="postgresql://usuario:senha@host:porta/db"
BACKEND_PORT=PORTA DO BACKEND

NODE_ENV=development

JWT_SECRET="chave_secreta_segura"

FRONTEND_URL="url_frontend"
```

**5. Execute as migrações Prisma:**
```bash
npm run prisma:migrate
npm run prisma:generate
```

**6. Inicie o servidor:**
```bash
npm run dev
```

## 📷 Imagens do Projeto
<img width="1869" height="332" alt="Captura de tela 2025-07-14 231853" src="https://github.com/user-attachments/assets/2db7f8e0-19ca-4b4e-84d1-e7d6d351864d" />
<img width="725" height="685" alt="Captura de tela 2025-07-14 231910" src="https://github.com/user-attachments/assets/0bd3f3ed-cd73-4649-afbb-60827f44259d" />


## 🔗 Links Importantes
- Repositório da api:
[Repositório da API](https://github.com/Ju-Venan/API---Amazonia)
- Link da API:
[API](https://amazone-sznk.onrender.com/animal)
