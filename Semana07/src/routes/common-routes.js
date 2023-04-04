

const { Router } = require('express');

const commonRoutes = Router();

commonRoutes.get('/', (req, res) => {
    return res.render('home', { name: "SISTEMA WEB II - 2023", user: req.session.user});
});

commonRoutes.get('/faq', (req, res) => {
    return res.render('faq', { user: req.session.user });
})

module.exports = { commonRoutes };