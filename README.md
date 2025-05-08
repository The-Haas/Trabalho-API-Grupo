# 🎬 API de Filmes e Séries

Este é um trabalho proposto pelo Prof. GABRIEL LUIZ KUNZ na matéria de Linguagem de Programação 3, Desenvolvido por Igor Haas, Bruno Bareta e Felipe Damo. O Trabalho é uma API desenvolvida com **Node.js**, **Express** e **PostgreSQL** para gerenciar e consultar informações sobre filmes e séries, com suporte a filtros, relacionamentos com gêneros e detalhamento por temporadas e episódios.

---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg](https://node-postgres.com/) (cliente PostgreSQL para Node.js)

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

---

## 📌 Tabela de Endpoints da API

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


## 📌 Endpoints Detalhados da API

### 🎬 Filmes

#### `GET /filmes`  
Lista todos os filmes.

**Response:**
```json
[
  {
    "id_filme": 1,
    "titulo_filme": "teste",
    "duracao_filme": 120,
    "sinopse_filme": "Um agente secreto enfrenta sua maior missão.",
    "data_lancamento": "20/05/2020",
    "nome_genero": "Ação"
  }
]
```

#### `GET /filmes/filtros`  
Retorna os filmes pelos filtros (`titulo`, `ano`, `genero`).

**Exemplo de URL:** `/filmes/filtros?titulo=teste&ano=2020&genero=ação`

**Response:**
```json
[
  {
    "id_filme": 1,
    "titulo_filme": "teste",
    "duracao_filme": 120,
    "sinopse_filme": "Um agente secreto enfrenta sua maior missão.",
    "data_lancamento": "20/05/2020",
    "nome_genero": "Ação"
  }
]
```

#### `POST /filmes`  
Cria um novo filme.

**Request:**
```json
{
  "titulo": "Testee",
  "duracao": 136,
  "sinopse": "Um hacker descobre a verdade sobre sua realidade.",
  "data_lancamento": "1999-03-31",
  "nome_genero": "Ação"
}
```

**Response:**
```json
{
  "mensagem": "Filme inserido com sucesso!",
  "id_filme": 60
}
```

#### `PUT /filmes`  
Atualiza um filme pelo nome.

**Request:**
```json
{
  "titulo": "Testessse1w",
  "duracao": 136,
  "sinopse": "Um hacker descobre a verdade sobre sua realidade.",
  "data_lancamento": "2016-07-15",
  "nome_genero": "Romance"
}
```

**Response:**
```json
{
  "mensagem": "Filme \"Testessse1w\" editado com sucesso!",
  "id_filme": 60
}
```

#### `DELETE /filmes/:nome`  
Remove um filme pelo nome.

**Response:**
```json
{
  "mensagem": "Filme \"Testessse1w\" removido com sucesso!"
}
```

### 📺 Séries

#### `GET /series`  
Lista todas as séries com temporadas e episódios.

**Response:**
```json
[
  {
    "id_serie": 1,
    "titulo_serie": "Agentes do Caos",
    "sinopse_serie": "Agentes secretos combatem conspirações.",
    "data_lancamento": "10/09/2017",
    "nome_genero": "Ação",
    "temporadas": [
      {
        "numero_temporada": 1,
        "episodios": [
          {
            "numero_episodio": 1,
            "titulo_episodio": "Início do Caos",
            "duracao_episodio": 45
          }
        ]
      }
    ]
  }
]
```

#### `GET /series/filtros`  
Retorna as séries pelos filtros (`titulo`, `ano`, `genero`).

**Exemplo de URL:** `/series/filtros?ano=2017&genero=ação&titulo=agente`

#### `POST /series`  
Cria uma nova série.

**Request:**
```json
{
  "titulo": "Stranger Things",
  "sinopse": "Um grupo de crianças enfrenta eventos sobrenaturais em sua cidade.",
  "data_lancamento": "2016-07-15",
  "nome_genero": "Romance"
}
```

**Response:**
```json
{
  "mensagem": "Série inserida com sucesso!",
  "id_serie": 21
}
```

#### `PUT /series`  
Atualiza uma série pelo nome.

**Request:**
```json
{
  "titulo": "Agentes do Caos",
  "sinopse": "Nova sinopse da série",
  "data_lancamento": "2025-06-01",
  "nome_genero": "Drama"
}
```

**Response:**
```json
{
  "mensagem": "Série \"Agentes do Caos\" editada com sucesso!",
  "id_serie": 1
}
```

#### `DELETE /series/:nome`  
Remove uma série pelo nome.

**Response:**
```json
{
  "mensagem": "Série \"Agentes do Caos\" removida com sucesso!"
}
```

### 📅 Temporadas

#### `POST /temporadas`  
Cria uma nova temporada.

**Request:**
```json
{
  "nome_serie": "Stranger Things",
  "numero_temporada": 4
}
```

**Response:**
```json
{
  "mensagem": "Temporada 4 da série \"Stranger Things\" inserida com sucesso!",
  "id_temporada": 35
}
```

#### `DELETE /temporadas/:nomeSerie/:numero`  
Remove uma temporada específica.

**Response:**
```json
{
  "mensagem": "Temporada 4 da série \"Stranger Things\" removida com sucesso!"
}
```

### 📼 Episódios

#### `POST /episodios`  
Cria um novo episódio.

**Request:**
```json
{
  "nome_serie": "Stranger Things",
  "numero_temporada": 1,
  "numero_episodio": 1,
  "titulo_episodio": "Teste",
  "duracao_episodio": 45
}
```

**Response:**
```json
{
  "mensagem": "Episódio inserido com sucesso na temporada 1 da série \"Stranger Things\"."
}
```

#### `PUT /episodios`  
Atualiza um episódio específico.

**Request:**
```json
{
  "nome_serie": "Agentes do Caos",
  "numero_temporada": 2,
  "numero_episodio": 1,
  "titulo_episodio": "Novo Título",
  "duracao_episodio": 50
}
```

**Response:**
```json
{
  "mensagem": "Episódio 1 da temporada 2 da série \"Agentes do Caos\" atualizado com sucesso!"
}
```

#### `DELETE /episodios/:nomeSerie/:numeroTemporada/:nome`  
Remove um episódio específico.

**Response:**
```json
{
  "mensagem": "Episódio \"Teste\" removido com sucesso da temporada 1 da série \"Stranger Things\"."
}
```

### 🏷️ Gêneros

#### `GET /generos`  
Lista todos os gêneros.

**Response:**
```json
[
  {
    "id_genero": 1,
    "nome_genero": "Ação"
  }
]
```

#### `POST /generos`  
Cria um novo gênero.

**Request:**
```json
{
  "nome_genero": "Teste"
}
```

**Response:**
```json
{
  "mensagem": "Gênero inserido com sucesso!",
  "id_genero": 41
}
```

#### `PUT /generos`  
Atualiza um gênero específico.

**Request:**
```json
{
  "nome_antigo": "Drama",
  "nome_novo": "Drama Policial"
}
```

**Response:**
```json
{
  "mensagem": "Gênero atualizado com sucesso!"
}
```

#### `DELETE /generos/:nome`  
Remove um gênero específico.

**Response:**
```json
{
  "mensagem": "Gênero \"Romance\" removido com sucesso!"
}
```
