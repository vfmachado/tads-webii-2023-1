
const { db } = require("../database/dbconnection");
const { insereUser, listaUsers, User, buscaUser } = require("../models/user");
const bcrypt = require('bcrypt');


class UsersController {

    async login(req, res) {
        const { email, password} = req.body;
        console.log({
            msg: 'validando o usuario ' + email
        })

        try {
            const user = await buscaUser(email);
            console.log({ user });

            const match = await bcrypt.compare(password, user.password);
            if (match) {
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

        const usuarioLogado = req.session.user;

        if (!usuarioLogado) {
            return res.send("VOCE NAO ESTA LOGADO");
        }

        if (usuarioLogado.role != 'ADMIN') {
            return res.send('VOCE NAO TEM PERMISSAO PARA ACESSAR ESTA ROTA');
        }

        const reqJson = req.body;
        const senhaCriptografada = await bcrypt.hash(reqJson.password, 8);
        const user = new User(reqJson.name, reqJson.email, senhaCriptografada);
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
