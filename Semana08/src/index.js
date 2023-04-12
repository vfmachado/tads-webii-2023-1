const path = require('path');

const dotenv = require ('dotenv');
dotenv.config();

const port = process.env.PORTA;

const express = require('express');
const session = require('express-session');

const { moviesAndSeries } = require('./database/data');

const app = express();
app.use(session({
  secret: 'SEGREDO DA APLICACAO - CHAVE QUE NAO PODE SER RELEVADA',
  resave: false,
  saveUninitialized: true, // INICIAR UM SESSION MESMO QUE ELE NAO TENHA EXPLICITAMENTE INICIALIZADO
  cookie: { secure: false } // http
}));

app.use((req, res, next) => {

  if (!req.session.urls_buscadas) {
    req.session.urls_buscadas = [];
  }
  
  req.session.urls_buscadas.push(req.originalUrl);

  console.log({
    id: req.session.id,
    session: req.session
  });

  next();

});

// ADICIONA O COMPORTAMENTO DE RECEBER REQUESTS PELO REQ.BODY DOS FORMULARIOS
app.use(express.urlencoded({
  // extended: true
}));

app.use(express.static('public'))

// https://www.npmjs.com/package/ejs
// configuracao da template engine
app.set('view engine', 'ejs');

//  correcao para apontar corretamente o caminho do arquivo
app.set('views', path.join(__dirname, 'view'));


// importar as rotas
// e plugar na instancia do express
const { commonRoutes } = require('./routes/common-routes');
const { midiaRoutes } = require('./routes/midia-routes');
const { userRoutes } = require('./routes/user-routes');
const { logger } = require('./middlewares/logger');
app.use(commonRoutes);

app.use('/midias', midiaRoutes);

app.use('/users', logger, userRoutes);

app.get('*', (req, res) => {
    res.status(404).send("OOPS, nao encontrei");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});