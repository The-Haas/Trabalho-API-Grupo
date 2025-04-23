const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

//require('./routes')(app);

app.listen(PORT, () => {
    console.log('API Rodando na porta 3000');
});     