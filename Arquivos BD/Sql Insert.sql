-- Inserir gêneros
INSERT INTO GENERO (NOME_GENERO) VALUES
('Ação'),
('Comédia'),
('Drama'),
('Ficção Científica'),
('Terror'),
('Romance'),
('Documentário'),
('Animação'),
('Suspense'),
('Fantasia');

-- Inserir filmes (usando os IDs de gênero de 1 a 10)
INSERT INTO FILMES (TITULO_FILME, DURACAO_FILME, SINOPSE_FILME, DATA_LANCAMENTO, ID_GENERO) VALUES
('Explosão Final', 120, 'Um agente secreto enfrenta sua maior missão.', '2020-05-20', 1),
('Rindo à Toa', 90, 'Um grupo de amigos em uma viagem desastrosa.', '2019-08-15', 2),
('Caminhos da Vida', 130, 'Uma história emocionante sobre superação.', '2018-03-10', 3),
('No Limite do Amanhã', 110, 'A Terra é invadida por alienígenas.', '2021-07-01', 4),
('A Maldição da Casa', 100, 'Uma família se muda para uma casa mal-assombrada.', '2022-10-31', 5),
('Amor Sem Fronteiras', 105, 'Duas pessoas se apaixonam em tempos de guerra.', '2020-02-14', 6),
('Planeta Azul', 90, 'Um olhar sobre os oceanos do planeta.', '2023-01-01', 7),
('Aventura Animal', 95, 'Animais falantes embarcam em uma missão.', '2019-12-20', 8),
('O Enigma da Caverna', 102, 'Exploradores encontram algo aterrorizante.', '2021-11-10', 9),
('Reino dos Sonhos', 125, 'Um garoto descobre um mundo mágico.', '2020-06-22', 10);

-- Inserir séries (também usando os gêneros)
INSERT INTO SERIES (TITULO_SERIE, SINOPSE_SERIE, DATA_LANCAMENTO, ID_GENERO) VALUES
('Agentes do Caos', 'Agentes secretos combatem conspirações.', '2017-09-10', 1),
('Vida de Solteiro', 'A rotina engraçada de um grupo de amigos.', '2016-01-20', 2),
('Destino Incerto', 'Um drama familiar intenso.', '2018-05-22', 3),
('Galáxia Perdida', 'Viagem no espaço profundo.', '2019-07-30', 4),
('Sussurros da Noite', 'Coisas estranhas acontecem em uma cidadezinha.', '2020-10-01', 5),
('Corações Conectados', 'Histórias de amor que cruzam gerações.', '2017-02-14', 6),
('Verdades Ocultas', 'Documentário investigativo sobre crimes reais.', '2022-04-05', 7),
('Os Bichinhos', 'Série animada educativa.', '2015-11-15', 8),
('Sombra e Mistério', 'Investigação de casos misteriosos.', '2021-01-12', 9),
('Mundos Paralelos', 'Viagem entre dimensões alternativas.', '2023-03-18', 10);

-- Inserir temporadas (cada série terá pelo menos uma temporada)
INSERT INTO TEMPORADAS (NUMERO_TEMPORADA, ID_SERIE) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(1, 6), (1, 7), (1, 8), (1, 9), (1, 10);

-- Inserir episódios (cada temporada terá pelo menos um episódio)
INSERT INTO EPISODIOS (DURACAO_EPISODIO, NUMERO_EPISODIO, TITULO_EPISODIO, ID_TEMPORADA) VALUES
(45, 1, 'Início do Caos', 1),
(22, 1, 'Novos Vizinhos', 2),
(50, 1, 'A Descoberta', 3),
(40, 1, 'Missão Espacial', 4),
(42, 1, 'O Chamado', 5),
(38, 1, 'Primeiro Encontro', 6),
(60, 1, 'Caso #01', 7),
(25, 1, 'O Leão Falante', 8),
(48, 1, 'A Escuridão', 9),
(55, 1, 'Portais', 10);
