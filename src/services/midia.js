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



// Exporta as funções para serem usadas em outros arquivos
module.exports = {
    getFilmes,
    getSerie,
    getFilmesFiltros,
    getSeriesFiltros,
};