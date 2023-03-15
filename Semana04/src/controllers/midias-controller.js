const { moviesAndSeries } = require("../database/data");


class MidiasController {

    constructor(exemplo) {
        console.log('Iniciando o controller Midias com ' + exemplo)
    }

    mostraMidias(req, res) {
        let { page } = req.query; // destruturando o page de dentro do query
        // const page = req.query.page

        if (!page) page = 1;
        // page = page ? page : 1;

        const listaFiltrada = moviesAndSeries.filter(item => {
            return item.id > (page -1)*3 && item.id <= (page * 3)
        })

        const totalPages = Math.ceil(moviesAndSeries.length / 3);
    
        res.render('midias', { 
            name: 'Lista TOP 2023/1',
            lista: listaFiltrada,
            currentPage: page,
            totalPages: totalPages 
        });

    }

    detalhaMidia(req, res) {
        const { id } = req.params;

        const item = moviesAndSeries.find(i => i.id == id);

        res.render('detalhes', {
            name: 'Detalhe de item',
            ...item
        })

    }
}

module.exports = { MidiasController };
