const { UsersController } = require('./users-controller');

const Router = require('express').Router;

const userRoutes = new Router();

const usersController = new UsersController();

userRoutes.get('/users', usersController.lista);
userRoutes.get('/users/criar', usersController.mostraCriacao);
userRoutes.get('/users/:id', usersController.detalha);
userRoutes.post('/users', usersController.cria);

module.exports = { userRoutes };