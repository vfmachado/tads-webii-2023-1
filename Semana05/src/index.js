const path = require('path');

const express = require('express');
const { moviesAndSeries } = require('./database/data');

const app = express();

app.use(express.static('public'))

// https://www.npmjs.com/package/ejs
// configuracao da template engine
app.set('view engine', 'ejs');

//  correcao para apontar corretamente o caminho do arquivo
app.set('views', path.join(__dirname, 'view'));
 
const port = 3000;

// importar as rotas
// e plugar na instancia do express
const { commonRoutes } = require('./routes/common-routes');
const { midiaRoutes } = require('./routes/midia-routes');
app.use(commonRoutes);

app.use('/midias', midiaRoutes);

app.get('*', (req, res) => {
    res.status(404).send("OOPS, nao encontrei");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})