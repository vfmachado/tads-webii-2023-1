const { Router } = require('express');
const { UsersController } = require('../controllers/users-controller');

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post('/', async (req, res) => {
    return usersController.create(req, res);
    // console.log('CRIACAO DE USUARIO, CHEGOU  ' + JSON.stringify(req.body));
    // const user = req.body;
    // try {
    //     await usersController.create(user);
    //     res.redirect('/users');
    // } catch (error) {
    //     res.redirect('/erro.html')
    // }
});

userRoutes.get('/', (req, res) => {
    // return res.send('Listagem de usuarios' + JSON.stringify(req.query));
    return usersController.list(req, res);
})

module.exports = { userRoutes };