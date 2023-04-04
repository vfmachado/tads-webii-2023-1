const path = require('path');

const express = require('express');
const session = require('express-session');

const { moviesAndSeries } = require('./database/data');

const app = express();
//s%3AAgbb84Q0CcnW6cKT_gFCg5zLiOhE9huW.Yk%2FuwRnKmaXAFS3EuuILg4fayoLj2j18iZt6PbP9AeU
//s%3AAgbb84Q0CcnW6cKT_gFCg5zLiOhE9huW.Yk%2FuwRnKmaXAFS3EuuILg4fayoLj2j18iZt6PbP9AeU
//s%3AAgbb84Q0CcnW6cKT_gFCg5zLiOhE9huW.Yk%2FuwRnKmaXAFS3EuuILg4fayoLj2j18iZt6PbP9AeU
//s%3AZwd67JJv8cXJMX6UON-tCtAZm6hcC7HB.kILwBdtvUdbljIB14u84a6XQFE1HWlKu%2FVf2KPZVljU
//s%3AU0vOANGIpfPMDAsaNubYrxxcGvTblIas.2VekPw0T2KzUNaxPO9%2BdyQ2pD5Oi4g175Bmui6VhAmQ
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
 
const port = 3000;

// importar as rotas
// e plugar na instancia do express
const { commonRoutes } = require('./routes/common-routes');
const { midiaRoutes } = require('./routes/midia-routes');
const { userRoutes } = require('./routes/user-routes');
app.use(commonRoutes);

app.use('/midias', midiaRoutes);

app.use('/users', userRoutes);

app.get('*', (req, res) => {
    res.status(404).send("OOPS, nao encontrei");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});