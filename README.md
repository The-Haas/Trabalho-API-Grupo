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