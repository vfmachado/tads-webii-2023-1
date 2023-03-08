
const express = require('express');
const { moviesAndSeries } = require('./database/data');

const app = express();

// https://www.npmjs.com/package/ejs
// configuracao da template engine
app.set('view engine', 'ejs');
app.set('views', 'src/view')

const port = 3000;

const map = new Map();


app.get('/', (req, res) => {
  return res.render('inicial', { name: "SISTEMA WEB II - 2023"})
});

app.get('/resources', (req, res) => {
  let { page } = req.query; // destruturando o page de dentro do query
  // const page = req.query.page

  if (!page) page = 1;
  // page = page ? page : 1;

  const listaFiltrada = moviesAndSeries.filter(item => {
    return item.id > (page -1)*5 && item.id <= (page * 5)
  })

  let saida = `PAGINA ${page}<br><br>`

  listaFiltrada.forEach(item => {
    saida += `<a href="/resources/${item.id}">${item.id} - ${item.title}</a><br>`
  })

  res.send(saida);
});

app.get('/resources/sugestao', (req, res) => {
  const idx = Math.floor(Math.random() * moviesAndSeries.length +1);
  
  const sorteado = moviesAndSeries[idx];
  
  res.send(sorteado);

});


app.get('/resources/ranking', (req, res) => {
  // MOSTRAR OS 3 MAIORES DO RANKING
  let saida = 'RANKING <br>';

  const arrMap = [];

  // PADRAO ITERATOR
  const it = map.keys();
  while (key = it.next().value) {
    arrMap.push({
      chave: key,
      valor: map.get(key)
    })
  }

  arrMap.sort((a, b) => b.valor - a.valor);

  res.send(arrMap);
});

app.get('/resources/:id', (req, res) => {
  const { id } = req.params;

  if (map.has(id)) {
    map.set(id, map.get(id) + 1);
  } else {
    map.set(id, 1)
  }

  console.log("MAP " + id);
  console.log(map.get(id));

  const selecionado = moviesAndSeries.find(item => item.id == id);
  //res.send(selecionado);
  res.render('detalhes', { ...selecionado });

});

app.get('*', (req, res) => {
    res.status(404).send("OOPS, nao encontrei");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})