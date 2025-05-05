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

| Método | Rota            | Descrição                             |
| ------ | --------------- | ------------------------------------- |
| GET    | `/filmes`       | Lista todos os filmes                 |
| GET    | `/filmes/:nome` | Retorna um filme específico pelo nome |
| POST   | `/filmes`       | Cria um novo filme                    |
| PUT    | `/filmes/:nome` | Atualiza um filme pelo nome           |
| DELETE | `/filmes/:nome` | Remove um filme pelo nome             |

---

### 📺 Séries

| Método | Rota            | Descrição                              |
| ------ | --------------- | -------------------------------------- |
| GET    | `/series`       | Lista todas as séries                  |
| GET    | `/series/:nome` | Retorna uma série específica pelo nome |
| POST   | `/series`       | Cria uma nova série                    |
| PUT    | `/series/:nome` | Atualiza uma série pelo nome           |
| DELETE | `/series/:nome` | Remove uma série pelo nome             |

---

### 📅 Temporadas

| Método | Rota                             | Descrição                         |
| ------ | -------------------------------- | --------------------------------- |
| GET    | `/temporadas`                    | Lista todas as temporadas         |
| GET    | `/temporadas/:nomeSerie/:numero` | Retorna uma temporada específica  |
| POST   | `/temporadas`                    | Cria uma nova temporada           |
| PUT    | `/temporadas/:nomeSerie/:numero` | Atualiza uma temporada específica |
| DELETE | `/temporadas/:nomeSerie/:numero` | Remove uma temporada específica   |

---

### 📼 Episódios

| Método | Rota                                           | Descrição                       |
| ------ | ---------------------------------------------- | ------------------------------- |
| GET    | `/episodios`                                   | Lista todos os episódios        |
| GET    | `/episodios/:nomeSerie/:numeroTemporada/:nome` | Retorna um episódio específico  |
| POST   | `/episodios`                                   | Cria um novo episódio           |
| PUT    | `/episodios/:nomeSerie/:numeroTemporada/:nome` | Atualiza um episódio específico |
| DELETE | `/episodios/:nomeSerie/:numeroTemporada/:nome` | Remove um episódio específico   |

---

### 🏷️ Gêneros

| Método | Rota             | Descrição                     |
| ------ | ---------------- | ----------------------------- |
| GET    | `/generos`       | Lista todos os gêneros        |
| GET    | `/generos/:nome` | Retorna um gênero específico  |
| POST   | `/generos`       | Cria um novo gênero           |
| PUT    | `/generos/:nome` | Atualiza um gênero específico |
| DELETE | `/generos/:nome` | Remove um gênero específico   |

---

Se quiser, posso gerar essa documentação em formato **Markdown com código-fonte (c/ exemplos de JSON)** ou montar uma versão para o **Swagger/OpenAPI**. Deseja isso também?
