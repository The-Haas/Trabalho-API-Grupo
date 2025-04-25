const service = require('../services/midia.js');


async function getFilmes(req, res) {
    let filmes = await service.getFilmes();
    return res.status(200).json(filmes);
};

async function getFilmesFiltros(req, res) {

    const titulo = req.query.titulo;
    const ano = req.query.ano;
    const genero = req.query.genero;

    let filmes = await service.getFilmesFiltros(titulo, ano, genero);

    // Verifica se o array de filmes está vazio
    if (filmes.length === 0) {
        // Retorna status 404 e uma mensagem de erro
        return res.status(404).json({ message: 'Nenhum filme encontrado com os filtros fornecidos.' });
    }

    return res.status(200).json(filmes);
}

async function getSerie(req, res) {
    let series = await service.getSerie();
    return res.status(200).json(series);
}

module.exports = {
    getFilmes,
    getSerie,
    getFilmesFiltros,
};