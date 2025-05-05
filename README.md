# 🎬 API de Filmes e Séries

Este é um trabalho proposto pelo Prof. GABRIEL LUIZ KUNZ na matéria de Linguagem de Programação 3, Desenvolvido por Igor Haas, Bruno Bareta e Felipe Damo. O Trabalho é uma API desenvolvida com **Node.js**, **Express** e **PostgreSQL** para gerenciar e consultar informações sobre filmes e séries, com suporte a filtros, relacionamentos com gêneros e detalhamento por temporadas e episódios.

---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg](https://node-postgres.com/) (cliente PostgreSQL para Node.js)



---

## 📌 Endpoints da API

### 🎬 Filmes

| Método | Rota              | Descrição                             |
| ------ | ---------------   | ------------------------------------- |
| GET    | `/filmes`         | Lista todos os filmes                 |
| GET    | `/filmes/filtros` | Retorna os filmes pelos filtros       |
| POST   | `/filmes`         | Cria um novo filme                    |
| PUT    | `/filmes`         | Atualiza um filme pelo nome           |
| DELETE | `/filmes/:nome`   | Remove um filme pelo nome             |

---

### 📺 Séries

| Método | Rota              | Descrição                              |
| ------ | ---------------   | -------------------------------------- |
| GET    | `/series`         | Lista todas as séries                  |
| GET    | `/series/filtros` | Retorna as séries pelos filtros        |
| POST   | `/series`         | Cria uma nova série                    |
| PUT    | `/series`         | Atualiza uma série pelo nome           |
| DELETE | `/series/:nome`   | Remove uma série pelo nome             |

---

### 📅 Temporadas

| Método | Rota                             | Descrição                         |
| ------ | -------------------------------- | --------------------------------- |
| POST   | `/temporadas`                    | Cria uma nova temporada           |
| DELETE | `/temporadas/:nomeSerie/:numero` | Remove uma temporada específica   |

---

### 📼 Episódios

| Método | Rota                                           | Descrição                       |
| ------ | ---------------------------------------------- | ------------------------------- |
| POST   | `/episodios`                                   | Cria um novo episódio           |
| PUT    | `/episodios`                                   | Atualiza um episódio específico |
| DELETE | `/episodios/:nomeSerie/:numeroTemporada/:nome` | Remove um episódio específico   |

---

### 🏷️ Gêneros

| Método | Rota             | Descrição                     |
| ------ | ---------------- | ----------------------------- |
| GET    | `/generos`       | Lista todos os gêneros        |
| POST   | `/generos`       | Cria um novo gênero           |
| PUT    | `/generos`       | Atualiza um gênero específico |
| DELETE | `/generos/:nome` | Remove um gênero específico   |

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas:

* [Node.js](https://nodejs.org/) (v14 ou superior)
* [npm](https://www.npmjs.com/) (instalado junto com o Node)
* [PostgreSQL](https://www.postgresql.org/)

Verifique se o Node.js e o npm estão instalados:

```bash
node -v
npm -v
```

---

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências do projeto:**

```bash
npm install
```

3. **Instale o cliente PostgreSQL (caso necessário):**

```bash
npm install pg
```

---

## 🗃️ Criação do Banco de Dados

Antes de configurar o ambiente, crie o banco de dados no PostgreSQL utilizando os scripts que estão disponíveis na pasta `/Arquivos`.

1. Acesse o PostgreSQL pelo terminal ou uma interface como o pgAdmin.
2. Crie o banco de dados:

```sql
CREATE DATABASE nomedobanco;
```
Rode os scripts SQL fornecidos para criar as tabelas e dados iniciais:

---

## 🔐 Configuração do Ambiente

1. **Crie um arquivo `.env` na raiz do projeto:**

```bash
touch .env
```

2. **Adicione as variáveis de ambiente:**

```env
DB_USER=postgres
DB_PASSWORD=Senha do seu BD
DB_HOST=localhost
DB_PORT=Porta do seu BD
DB_NAME=Nome do BD Criado
```

---

## 🔁 Configuração do Nodemon

1. **Instale o `nodemon` como dependência de desenvolvimento:**

```bash
npm install --save-dev nodemon
```

---

## ▶️ Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```