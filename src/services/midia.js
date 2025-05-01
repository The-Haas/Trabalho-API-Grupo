const db = require('../config');

//função para retornar todos os filmes
async function getFilmes() {
    try {
        const result = await db.query(`SELECT f.ID_FILME,
                                       		  f.TITULO_FILME,
                                       		  f.DURACAO_FILME,
                                       		  f.SINOPSE_FILME,
                                       		  TO_CHAR(f.DATA_LANCAMENTO, 'DD/MM/YYYY') AS DATA_LANCAMENTO,
                                       		  g.NOME_GENERO
                                       FROM FILMES f
                                       JOIN GENERO g ON f.ID_GENERO = g.ID_GENERO;
                                     `);
        return result.rows;

    }
    catch (e) {
        console.error('Erro ao buscar filmes:', e);
        throw e;
    }
}

async function getFilmesFiltros(titulo, ano, genero) {
    try {
        let query = `SELECT f.ID_FILME,
                        f.TITULO_FILME,
                        f.DURACAO_FILME,
                        f.SINOPSE_FILME,
                        TO_CHAR(f.DATA_LANCAMENTO, 'DD/MM/YYYY') AS DATA_LANCAMENTO,
                        g.NOME_GENERO 
                     FROM filmes f 
                     JOIN genero g ON f.id_genero = g.id_genero WHERE 1=1`;
        let params = [];

        // Se o título for fornecido, adiciona o filtro de título
        if (titulo) {
            query += ' AND f.TITULO_FILME ILIKE $' + (params.length + 1);
            params.push(`%${titulo}%`);
        }

        // Se o ano for fornecido, adiciona o filtro de ano
        if (ano) {
            query += ' AND EXTRACT(YEAR FROM f.DATA_LANCAMENTO) = $' + (params.length + 1);
            params.push(ano);
        }

        // Se o gênero for fornecido, adiciona o filtro de gênero
        if (genero) {
            query += ' AND g.NOME_GENERO ILIKE $' + (params.length + 1);
            params.push(`%${genero}%`);
        }

        // Executa a consulta com os parâmetros dinâmicos
        const result = await db.query(query, params);
        return result.rows;
    } catch (e) {
        console.error('Erro ao buscar filmes:', e);
        throw e;
    }
}





//Funçao para retornar todas as series
// A função retorna um objeto JSON com as informações de cada série, incluindo suas temporadas e episódios
async function getSerie() {

    try {
        const result = await db.query(` SELECT 
                                            s.ID_SERIE,
                                            s.TITULO_SERIE,
                                            s.SINOPSE_SERIE,
                                            TO_CHAR(s.DATA_LANCAMENTO, 'DD/MM/YYYY') AS DATA_LANCAMENTO,
                                            g.NOME_GENERO,
                                            json_agg(
                                                json_build_object(
                                                    'numero_temporada', t.NUMERO_TEMPORADA,
                                                    'episodios', (
                                                        SELECT json_agg(
                                                            json_build_object(
                                                                'numero_episodio', e.NUMERO_EPISODIO,
                                                                'titulo_episodio', e.TITULO_EPISODIO,
                                                                'duracao_episodio', e.DURACAO_EPISODIO
                                                            )
                                                        )
                                                        FROM EPISODIOS e
                                                        WHERE e.ID_TEMPORADA = t.ID_TEMPORADA
                                                    )
                                                )
                                            ) AS temporadas
                                        FROM SERIES s
                                        JOIN GENERO g ON s.ID_GENERO = g.ID_GENERO
                                        JOIN TEMPORADAS t ON s.ID_SERIE = t.ID_SERIE
                                        GROUP BY s.ID_SERIE, s.TITULO_SERIE, s.DATA_LANCAMENTO, g.NOME_GENERO
                                        ORDER BY s.ID_SERIE
                                     `);
        return result.rows;

    }
    catch (e) {
        console.error('Erro ao buscar series:', e);
        throw e;
    }
}

async function getSeriesFiltros(titulo, ano, genero) {
    try {
        let query = `
            SELECT 
                s.ID_SERIE,
                s.TITULO_SERIE,
                s.SINOPSE_SERIE,
                TO_CHAR(s.DATA_LANCAMENTO, 'DD/MM/YYYY') AS DATA_LANCAMENTO,
                g.NOME_GENERO,
                json_agg(
                    json_build_object(
                        'numero_temporada', t.NUMERO_TEMPORADA,
                        'episodios', (
                            SELECT json_agg(
                                json_build_object(
                                    'numero_episodio', e.NUMERO_EPISODIO,
                                    'titulo_episodio', e.TITULO_EPISODIO,
                                    'duracao_episodio', e.DURACAO_EPISODIO
                                )
                            )
                            FROM EPISODIOS e
                            WHERE e.ID_TEMPORADA = t.ID_TEMPORADA
                        )
                    )
                ) AS temporadas
            FROM SERIES s
            JOIN GENERO g ON s.ID_GENERO = g.ID_GENERO
            JOIN TEMPORADAS t ON s.ID_SERIE = t.ID_SERIE
            WHERE 1=1
        `;

        let params = [];

        if (titulo) {
            query += ' AND s.TITULO_SERIE ILIKE $' + (params.length + 1);
            params.push(`%${titulo}%`);
        }

        if (ano) {
            query += ' AND EXTRACT(YEAR FROM s.DATA_LANCAMENTO) = $' + (params.length + 1);
            params.push(ano);
        }

        if (genero) {
            query += ' AND g.NOME_GENERO ILIKE $' + (params.length + 1);
            params.push(`%${genero}%`);
        }

        query += `
            GROUP BY s.ID_SERIE, s.TITULO_SERIE, s.DATA_LANCAMENTO, g.NOME_GENERO
            ORDER BY s.ID_SERIE
        `;

        const result = await db.query(query, params);
        return result.rows;

    } catch (e) {
        console.error('Erro ao buscar séries com filtros:', e);
        throw e;
    }
}

// Função para listar todos os gêneros
async function getGeneros() {
    try {
        const result = await db.query(`SELECT * FROM GENERO`);
        return result.rows;
    } catch (e) {
        console.error('Erro ao listar gêneros:', e);
        throw e;
    }
}

// Função para listar os gêneros por nome
async function getGenerosNome(nome_genero) {
    try {
        const result = await db.query(`
            SELECT ID_GENERO 
            FROM GENERO 
            WHERE NOME_GENERO ILIKE $1
        `, [nome_genero]);

        if (result.rowCount === 0) {
            throw new Error(`Gênero "${nome_genero}" não encontrado.`);
        }

        return result.rows[0].id_genero;
    } catch (e) {
        console.error('Erro ao listar gêneros:', e);
        throw e;
    }
}



// Função para inserir filme
async function postFilme(titulo, duracao, sinopse, data_lancamento, nome_genero) {
    try {
        // Primeiro, buscar o ID do gênero pelo nome
        const generoResult = await db.query(`
            SELECT ID_GENERO 
            FROM GENERO 
            WHERE NOME_GENERO = $1
        `, [nome_genero]);

        if (generoResult.rowCount === 0) {
            throw new Error(`Gênero "${nome_genero}" não encontrado. Filme não inserido.`);
        }

        const id_genero = generoResult.rows[0].id_genero;

        // Verificar se o filme já existe (comparando pelo título, e opcionalmente, também pela data de lançamento)
        const filmeExistente = await db.query(`
            SELECT ID_FILME 
            FROM FILMES 
            WHERE TITULO_FILME = $1
        `, [titulo]);

        if (filmeExistente.rowCount > 0) {
            throw new Error(`Filme "${titulo}" já cadastrado. Não foi possível inserir novamente.`);
        }

        // Inserir o filme com o ID do gênero encontrado
        const insertResult = await db.query(`
            INSERT INTO FILMES (TITULO_FILME, DURACAO_FILME, SINOPSE_FILME, DATA_LANCAMENTO, ID_GENERO)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING ID_FILME;
        `, [titulo, duracao, sinopse, data_lancamento, id_genero]);

        return { 
            mensagem: `Filme inserido com sucesso!`, 
            id_filme: insertResult.rows[0].id_filme 
        };

    } catch (e) {
        console.error('Erro ao inserir filme:', e.message);
        throw e;
    }
}


// Função para inserir série
// Função para inserir uma nova série
async function postSerie(titulo, sinopse, data_lancamento, nome_genero) {
    try {
        // Verifica se o gênero existe
        const generoResult = await db.query(`
            SELECT ID_GENERO 
            FROM GENERO 
            WHERE NOME_GENERO = $1
        `, [nome_genero]);

        if (generoResult.rowCount === 0) {
            throw new Error(`Gênero "${nome_genero}" não encontrado. Série não inserida.`);
        }

        const id_genero = generoResult.rows[0].id_genero;

        // Verifica se a série já existe
        const serieExistente = await db.query(`
            SELECT ID_SERIE 
            FROM SERIES 
            WHERE TITULO_SERIE = $1
        `, [titulo]);

        if (serieExistente.rowCount > 0) {
            throw new Error(`Série "${titulo}" já cadastrada. Não foi possível inserir novamente.`);
        }

        // Insere a nova série
        const insertResult = await db.query(`
            INSERT INTO SERIES (TITULO_SERIE, SINOPSE_SERIE, DATA_LANCAMENTO, ID_GENERO)
            VALUES ($1, $2, $3, $4)
            RETURNING ID_SERIE;
        `, [titulo, sinopse, data_lancamento, id_genero]);

        return {
            mensagem: `Série inserida com sucesso!`,
            id_serie: insertResult.rows[0].id_serie
        };

    } catch (e) {
        console.error('Erro ao inserir série:', e.message);
        throw e;
    }
}



// Função para inserir uma nova temporada com base no nome da série
async function postTemporada(nome_serie, numero_temporada) {
    try {
        // Verifica se a série existe e recupera o ID
        const serieResult = await db.query(`
            SELECT ID_SERIE 
            FROM SERIES 
            WHERE TITULO_SERIE ILIKE $1
        `, [nome_serie]);

        if (serieResult.rowCount === 0) {
            throw new Error(`Série "${nome_serie}" não encontrada. Temporada não inserida.`);
        }

        const id_serie = serieResult.rows[0].id_serie;

        // Verifica se a temporada já existe para essa série
        const temporadaExistente = await db.query(`
            SELECT ID_TEMPORADA 
            FROM TEMPORADAS 
            WHERE ID_SERIE = $1 AND NUMERO_TEMPORADA = $2
        `, [id_serie, numero_temporada]);

        if (temporadaExistente.rowCount > 0) {
            throw new Error(`Temporada ${numero_temporada} já cadastrada para a série "${nome_serie}".`);
        }

        // Insere a nova temporada
        const insertResult = await db.query(`
            INSERT INTO TEMPORADAS (ID_SERIE, NUMERO_TEMPORADA)
            VALUES ($1, $2)
            RETURNING ID_TEMPORADA;
        `, [id_serie, numero_temporada]);

        return {
            mensagem: `Temporada ${numero_temporada} da série "${nome_serie}" inserida com sucesso!`,
            id_temporada: insertResult.rows[0].id_temporada
        };

    } catch (e) {
        console.error('Erro ao inserir temporada:', e.message);
        throw e;
    }
}


async function postEpisodio(nome_serie, numero_temporada, numero_episodio, titulo_episodio, duracao_episodio) {
    try {
        // Busca o ID da série
        const serieResult = await db.query(`
            SELECT ID_SERIE FROM SERIES WHERE TITULO_SERIE = $1
        `, [nome_serie]);

        if (serieResult.rowCount === 0) {
            throw new Error(`Série "${nome_serie}" não encontrada.`);
        }

        const id_serie = serieResult.rows[0].id_serie;

        // Busca o ID da temporada
        const temporadaResult = await db.query(`
            SELECT ID_TEMPORADA FROM TEMPORADAS 
            WHERE ID_SERIE = $1 AND NUMERO_TEMPORADA = $2
        `, [id_serie, numero_temporada]);

        if (temporadaResult.rowCount === 0) {
            throw new Error(`Temporada ${numero_temporada} da série "${nome_serie}" não encontrada.`);
        }

        const id_temporada = temporadaResult.rows[0].id_temporada;

        // Verifica se o episódio já existe na temporada
        const episodioExistente = await db.query(`
            SELECT 1 FROM EPISODIOS 
            WHERE ID_TEMPORADA = $1 AND NUMERO_EPISODIO = $2
        `, [id_temporada, numero_episodio]);

        if (episodioExistente.rowCount > 0) {
            throw new Error(`Episódio ${numero_episodio} já cadastrado na temporada ${numero_temporada} da série "${nome_serie}".`);
        }

        // Insere o episódio
        await db.query(`
            INSERT INTO EPISODIOS (ID_TEMPORADA, NUMERO_EPISODIO, TITULO_EPISODIO, DURACAO_EPISODIO)
            VALUES ($1, $2, $3, $4)
        `, [id_temporada, numero_episodio, titulo_episodio, duracao_episodio]);

        return { mensagem: `Episódio inserido com sucesso na temporada ${numero_temporada} da série "${nome_serie}".` };
    } catch (e) {
        console.error('Erro no service ao inserir episódio:', e.message);
        throw e;
    }
}



// Função para inserir um novo gênero
async function postGenero(nome_genero) {
    try {
        // Verifica se o gênero já existe
        const generoExistente = await db.query(`
            SELECT ID_GENERO 
            FROM GENERO 
            WHERE NOME_GENERO ILIKE $1
        `, [nome_genero]);

        if (generoExistente.rowCount > 0) {
            throw new Error(`Gênero "${nome_genero}" já está cadastrado.`);
        }

        // Insere o novo gênero
        const result = await db.query(`
            INSERT INTO GENERO (NOME_GENERO)
            VALUES ($1)
            RETURNING ID_GENERO;
        `, [nome_genero]);

        return {
            mensagem: `Gênero inserido com sucesso!`,
            id_genero: result.rows[0].id_genero
        };

    } catch (e) {
        console.error('Erro ao inserir gênero:', e.message);
        throw e;
    }
}


/*
*Rotas e Funções a Finalizar

* Editar Filmes
* Editar Series
* Editar Temporadas
* Editar Episodios
* Editar Generos

* Deletar Filmes
* Deletar Series
* Deletar Temporadas
* Deletar Episodios
* Deletar Generos
*/


// Exporta as funções para serem usadas em outros arquivos
module.exports = {
    getFilmes,
    getSerie,
    getFilmesFiltros,
    getSeriesFiltros,
    getGeneros,
    getGenerosNome,

    postFilme,
    postSerie,
    postTemporada,
    postEpisodio,
    postGenero,
};