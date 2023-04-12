const { moviesAndSeries } = require("../database/data");
const { db } = require("../database/dbconnection");
const { listaSeries, detalhaSerie } = require("../models/serie-dao");


class MidiasController {

    constructor(exemplo) {
        console.log('Iniciando o controller Midias com ' + exemplo)
    }

    // adicionar uma view para inserir e depois chamar o form com os dados para injetar no banco
    async inserirMidia(req, res) {
        // tratar o req.body para receber os dados do form (pesquisem!)

        // serie-dao => criar um método para inserir uma mídia no banco
            // passando por parametro uma serie instanciada do meu model

        // retornar um ok ou redirecionar para a pagina de listagem

        // caso de errado, redireciona para uma pagina de erro
    }

    // incluir paginacao
    async mostraMidias(req, res) {

        // PARSER DO REQUEST 

        let { page } = req.query; // destruturando o page de dentro do query
        // const page = req.query.page

        if (!page) page = 1;
        // page = page ? page : 1;

        // const listaFiltrada = moviesAndSeries.filter(item => {
        //     return item.id > (page -1)*3 && item.id <= (page * 3)
        // })

        // const totalPages = Math.ceil(moviesAndSeries.length / 3);
    
        // CAMADA DE ACESSO / LOGICA

        const lista = await listaSeries();

        // VIEW 
        res.render('midias', { 
            user: req.session.user,
            name: 'Lista TOP 2023/1',
            lista: lista,
            currentPage: page,
            totalPages: 1 
        });

    }

    // trazer dado do banco
    async detalhaMidia(req, res) {
        console.log(({ params: req.params}))
        const { id } = req.params;
        console.log({ id })
        // const item = moviesAndSeries.find(i => i.id == id);
        try {
            const item =  await detalhaSerie(id);
            return res.render('detalhes', {
                user: req.session.user,
                name: 'Detalhe de item',
                ...item
            })

        } catch (error) {
            console.error({ error });
            return res.send('PAGINA NAO ENCONTRADA');
        }
        
    }
}

module.exports = { MidiasController };
