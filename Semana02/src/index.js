// IMPORTACAO DA DEPENDENCIA EXPRESS
const express = require('express');
const users = require('./database/data');

// EXECUTA A FUNCAO EXPORTADA E INICIALIZA O EXPRESS
// RETORNA "SERVER HTTP" ENCAPSULADO
const app = express();

// DECLARACAO DE CONSTANTE
const port = 3000;

// ADICIONA UMA ROTA COM MÉTODO GET
                // REQUEST E RESPONSE (MUITO SIMILAR AO HTTP DO NODEJS)
app.get('/', (req, res) => {

    // NOSSA LOGICA
  res.send('Hello World 2!')
});

app.get('/user/:username/', (req, res) => {
    const username = req.params.username;
    const user = users.filter(u => u.username == username)[0];
    if (user) {
        return res.send(`Pagina de um usuario de username ${username}
        <br>Seus hobbies são: ${user.hobbies}
        <br>pagina com parametro: ${req.params.outroparam}`);
    }
    return res.status(404).send('USUARIO NAO ENCONTRADO');  
})



// AS ROTAS SAO AVALIADAS EM ORDEM
app.get('*', (req, res) => {
    res.status(404).send("OOPS, nao encontrei");
})

// LISTEN => COMEÇA A EXECUTAR EM UMA PORTA...
            // funcao de callback quando o server estiver de pé
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})