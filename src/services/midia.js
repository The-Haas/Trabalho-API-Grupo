const db = require('../config');

//função para retornar todos os filmes
async function getFilmes() {
    try {
        const result = await db.query('SELECT * FROM filmes');
        return result.rows;

    }
    catch (e) {
        console.error('Erro ao buscar filmes:', e);
        throw e;
    }
}

async function getFilmesFiltros(titulo, ano, genero) {
    try {
        let query = 'SELECT f.*, g.NOME_GENERO FROM filmes f JOIN genero g ON f.id_genero = g.id_genero WHERE 1=1';
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
                                            SERIES.ID_SERIE,
                                            SERIES.TITULO_SERIE,
                                            json_agg(
                                                json_build_object(
                                                    'numero_temporada', TEMPORADAS.NUMERO_TEMPORADA,
                                                    'episodios', (
                                                        SELECT json_agg(
                                                            json_build_object(
                                                                'numero_episodio', EPISODIOS.NUMERO_EPISODIO,
                                                                'titulo_episodio', EPISODIOS.TITULO_EPISODIO,
                                                                'duracao_episodio', EPISODIOS.DURACAO_EPISODIO
                                                            )
                                                        )
                                                        FROM EPISODIOS
                                                        WHERE EPISODIOS.ID_TEMPORADA = TEMPORADAS.ID_TEMPORADA
                                                    )
                                                )
                                            ) AS temporadas
                                        FROM SERIES
                                        JOIN TEMPORADAS ON SERIES.ID_SERIE = TEMPORADAS.ID_SERIE
                                        GROUP BY SERIES.ID_SERIE, SERIES.TITULO_SERIE
                                        ORDER BY SERIES.ID_SERIE;
                                     `);
        return result.rows;

    }
    catch (e) {
        console.error('Erro ao buscar series:', e);
        throw e;
    }
}




// Exporta as funções para serem usadas em outros arquivos
module.exports = {
    getFilmes,
    getSerie,
    getFilmesFiltros,
};