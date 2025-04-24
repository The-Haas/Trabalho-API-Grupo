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

module.exports = {
    getFilmes,
};