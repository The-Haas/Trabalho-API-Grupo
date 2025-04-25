const controller = require('../controllers/midia.js');

// rotas para acessar pela url para realizar as funcoes
module.exports = (app) => {
    app.get('/filmes', controller.getFilmes)
    app.get('/series', controller.getSerie)
    app.get('/filmes/filtros', controller.getFilmesFiltros)
};