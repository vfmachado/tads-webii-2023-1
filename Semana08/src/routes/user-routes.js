const { Router } = require('express');
const { UsersController } = require('../controllers/users-controller');
const { isAuth } = require('../middlewares/is-auth');
const { isAdmin } = require('../middlewares/is-admin');

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post('/', isAuth, isAdmin, async (req, res) => {
    return usersController.create(req, res);
});

userRoutes.get('/', isAuth, (req, res) => {
    // return res.send('Listagem de usuarios' + JSON.stringify(req.query));
    return usersController.list(req, res);
})


userRoutes.get('/login', (req, res) => {
    if (req.session.user) {
        return res.send('VOCE JA LOGOU');
    } else {
        return res.render('login')
    };
});

userRoutes.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

userRoutes.post('/login', (req, res) => usersController.login(req, res));

module.exports = { userRoutes };