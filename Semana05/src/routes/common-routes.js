

const { Router } = require('express');

const commonRoutes = Router();

commonRoutes.get('/', (req, res) => {
    return res.render('home', { name: "SISTEMA WEB II - 2023"});
});

commonRoutes.get('/faq', (req, res) => {
    return res.render('faq');
})

module.exports = { commonRoutes };