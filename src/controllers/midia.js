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

async function getSeriesFiltros(req, res) {

    const titulo = req.query.titulo;
    const ano = req.query.ano;
    const genero = req.query.genero;

    let series = await service.getSeriesFiltros(titulo, ano, genero);

    // Verifica se o array de series está vazio
    if (series.length === 0) {
        // Retorna status 404 e uma mensagem de erro
        return res.status(404).json({ message: 'Nenhuma série encontrada com os filtros fornecidos.' });
    }
    return res.status(200).json(series);

}

// Função para listar todos os generos
async function listarGeneros(req, res) {
    try {
        const generos = await service.listarGeneros();
        return res.status(200).json(generos);
    } catch (error) {
        console.error('Erro ao listar gêneros:', error);
        return res.status(500).json({ error: 'Erro ao listar gêneros' });
    }
}


async function inserirFilme(req, res) {
    const { titulo, duracao, sinopse, data_lancamento, nome_genero } = req.body;

    try {
        const result = await service.inserirFilme(titulo, duracao, sinopse, data_lancamento, nome_genero);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir filme:', error);
        return res.status(500).json({ error: 'Erro ao inserir filme' });
    }
}


module.exports = {
    getFilmes,
    getSerie,
    getFilmesFiltros,
    getSeriesFiltros,
    inserirFilme,
    listarGeneros,
};