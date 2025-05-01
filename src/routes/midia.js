const controller = require('../controllers/midia.js');

// rotas para acessar pela url para realizar as funcoes
module.exports = (app) => {
    app.get('/filmes', controller.getFilmes)
    app.get('/series', controller.getSerie)
    app.get('/filmes/filtros', controller.getFilmesFiltros)
    app.get('/series/filtros', controller.getSeriesFiltros)
    app.get('/generos', controller.getGeneros)
    app.get('/generos/nome', controller.getGenerosNome)
    
    app.post('/filmes', controller.postFilme)
    app.post('/series', controller.postSerie)
    app.post('/temporadas', controller.postTemporada)
    app.post('/episodios', controller.postEpisodio)
    app.post('/generos', controller.postGenero)

    app.put('/filmes', controller.putFilme)
    app.put('/series', controller.putSerie)
    app.put('/episodios', controller.putEpisodio)
    app.put('/generos', controller.putGenero)

    app.delete('/filmes/:titulo', controller.deleteFilme)
    app.delete('/series/:titulo', controller.deleteSerie)
    app.delete('/temporadas/:nomeSerie/:numeroTemporada', controller.deleteTemporada)
    app.delete('/episodios/:nomeSerie/:numeroTemporada/:numeroEpisodio', controller.deleteEpisodio)
    app.delete('/generos/:nomeGenero', controller.deleteGenero)    
};