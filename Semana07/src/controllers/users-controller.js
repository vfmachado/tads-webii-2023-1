
const { db } = require("../database/dbconnection");
const { insereUser, listaUsers, User, buscaUser } = require("../models/user");

class UsersController {

    async login(req, res) {
        const { email, password} = req.body;
        console.log({
            msg: 'validando o usuario ' + email
        })

        try {
            const user = await buscaUser(email);
            console.log({ user });

            if (user.password == password) {
                delete user.password;
                req.session.user = user;
                return res.send('USUARIO LOGADO COM SUCESSO');
            }

            return res.send('email encontrado mas a senha nao confere');

        } catch (error) {
            return res.send('USUARIO NAO ENCONTRADO')
        }   
    }

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
        return res.render('users', { users, user: req.session.user })
    }
};

module.exports = { UsersController };
