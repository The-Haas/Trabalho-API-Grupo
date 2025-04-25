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

module.exports = {
    getFilmes,
    getSerie,
};