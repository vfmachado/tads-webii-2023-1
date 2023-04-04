

const { Router } = require('express');
const { MidiasController } = require('../controllers/midias-controller');

// /midias/
const midiaRoutes = Router();
const midiasController = new MidiasController('MIDIAS ROUTES');


midiaRoutes.get('/', (req, res) => midiasController.mostraMidias(req, res));
midiaRoutes.get('/:id', (req, res) => midiasController.detalhaMidia(req, res));


module.exports = { midiaRoutes };