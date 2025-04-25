// Pega as variáveis do .env
require('dotenv').config();

const express = require('express');

// Importa o middleware de log
const { logMonitor } = require('./middleware/index'); // Caminho do arquivo

const app = express();

const PORT = 3000;

app.use(express.json());

// Middleware para capturar as requisições e logar as informações
app.use((req, res, next) => {
    logMonitor(req, res, next); // agora passando tudo corretamente
});

require('./routes')(app);

app.listen(PORT, () => {
    console.log('API Rodando na porta ' + PORT);
    console.log('Acesse: http://localhost:' + PORT);
});