
const { db } = require("../database/dbconnection");
const { insereUser, listaUsers, User } = require("../models/user");

class UsersController {
    async create(req, res) {
        const reqJson = req.body;
        const user = new User(reqJson.name, reqJson.email, reqJson.password);
        console.log({ user })
        // possivelmente vai ter validacao
        try {
            await insereUser(user);
            return res.redirect('/users');
        } catch (error) {
            // possivelmente, vamos ter algum tipo de tratamento
            return res.redirect('/erro.html')
        }
    }

    async list(req, res) {

        const users = await listaUsers();
        return res.render('users', { users })
    }
};

module.exports = { UsersController };
