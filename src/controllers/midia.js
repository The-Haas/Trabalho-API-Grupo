const service = require('../services/midia.js');


async function getFilmes(req, res) {
    let filmes = await service.getFilmes();
    return res.status(200).json(filmes);
};

module.exports = {
    getFilmes
};