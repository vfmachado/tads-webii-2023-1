const http = require('http');

const server = http.createServer((request, response) => {
    // response.end('REQUISICAO RECEBIDA COM SUCESSO');
    response.end(`
        <h1> TITULO DA PAGINA </h1>
        <h2> Vinicius </h2>
        <p> LOREM </p>
    `)
});

server.listen(3000);