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
async function getGeneros(req, res) {
    try {
        const generos = await service.getGeneros();
        return res.status(200).json(generos);
    } catch (error) {
        console.error('Erro ao listar gêneros:', error);
        return res.status(500).json({ error: 'Erro ao listar gêneros' });
    }
}

// Função para listar os generos por nome
async function getGenerosNome(req, res) {
    const { nome_genero } = req.query;

    try {
        const idGenero = await service.getGenerosNome(nome_genero);
        return res.status(200).json({ id_genero: idGenero });
    } catch (error) {
        console.error('Erro ao listar gêneros:', error.message);

        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Erro interno ao listar gêneros.' });
    }
}



async function postFilme(req, res) {
    const { titulo, duracao, sinopse, data_lancamento, nome_genero } = req.body;

    try {
        const result = await service.postFilme(titulo, duracao, sinopse, data_lancamento, nome_genero);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir filme:', error);
        return res.status(500).json({ error: 'Erro ao inserir filme' });
    }
}


async function postSerie(req, res) {
    const { titulo, sinopse, data_lancamento, nome_genero } = req.body;

    try {
        const result = await service.postSerie(titulo, sinopse, data_lancamento, nome_genero);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir série:', error);
        return res.status(500).json({ error: 'Erro ao inserir série' });
    }
}


async function postTemporada(req, res) {
    const { nome_serie, numero_temporada } = req.body;

    try {
        const result = await service.postTemporada(nome_serie, numero_temporada);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir temporada:', error.message);
        return res.status(500).json({ error: error.message });
    }
}


async function postEpisodio(req, res) {
    const { nome_serie, numero_temporada, numero_episodio, titulo_episodio, duracao_episodio } = req.body;

    try {
        const result = await service.postEpisodio(nome_serie, numero_temporada, numero_episodio, titulo_episodio, duracao_episodio);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir episódio:', error.message);
        return res.status(500).json({ error: error.message });
    }
}


async function postGenero(req, res) {
    const { nome_genero } = req.body;

    try {
        const result = await service.postGenero(nome_genero);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir gênero:', error.message);
        return res.status(500).json({ error: error.message });
    }
}


async function putFilme(req, res) {
    const { titulo, duracao, sinopse, data_lancamento, nome_genero } = req.body;

    try {
        const result = await service.putFilme(titulo, duracao, sinopse, data_lancamento, nome_genero);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao editar filme:', error);
        return res.status(500).json({ error: 'Erro ao editar filme' });
    }
}


async function putSerie(req, res) {
    const { titulo, sinopse, data_lancamento, nome_genero } = req.body;

    try {
        const result = await service.putSerie(titulo, sinopse, data_lancamento, nome_genero);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao editar série:', error);
        return res.status(500).json({ error: 'Erro ao editar série' });
    }
}


async function putEpisodio(req, res) {
    const { nome_serie, numero_temporada, numero_episodio, titulo_episodio, duracao_episodio } = req.body;

    try {
        const result = await service.putEpisodio(nome_serie, numero_temporada, numero_episodio, titulo_episodio, duracao_episodio);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao editar episódio:', error);
        return res.status(500).json({ error: 'Erro ao editar episódio' });
    }
}


async function putGenero(req, res) {
    const { nome_antigo, nome_novo } = req.body;

    try {
        const result = await service.putGenero(nome_antigo, nome_novo);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao editar gênero:', error);
        return res.status(500).json({ error: 'Erro ao editar gênero' });
    }
}


module.exports = {
    getFilmes,
    getSerie,
    getFilmesFiltros,
    getSeriesFiltros,
    getGeneros,
    getGenerosNome,

    postFilme,
    postSerie,
    postTemporada,
    postEpisodio,
    postGenero,

    putFilme,
    putSerie,
    putEpisodio,
    putGenero,
};