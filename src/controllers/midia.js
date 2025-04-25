const service = require('../services/midia.js');


async function getFilmes(req, res) {
    let filmes = await service.getFilmes();
    return res.status(200).json(filmes);
};

async function getSerie(req, res) {
    let series = await service.getSerie();
    return res.status(200).json(series);
}

module.exports = {
    getFilmes,
    getSerie,
};