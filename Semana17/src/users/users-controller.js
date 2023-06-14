const formidable = require("formidable");
const { dbConnection } = require("../config/database-connection");
const { UserSchema } = require("./users-schema");

class UsersController {

    constructor() {
       // this.usersRepository = dbConnection.getRepository(UserSchema);
    }


    async lista(req, res) {
        const usersRepository = dbConnection.getRepository(UserSchema);
        const users = await usersRepository.find();

        return res.render('users/listagem', { users });
    }

    async detalha(req, res) {
        const id = req.params.id
        const usersRepository = dbConnection.getRepository(UserSchema);
        const user = await usersRepository.findOne({
            where: {
                id
            }
        });
        return res.json(user);
    }

    async mostraCriacao(req, res) { 
        return res.render('users/criacao');
    }

    async cria(req, res) {
        console.log("BODY");
        console.log({ body: req.body });

        const form = formidable({ multiples: true, uploadDir: 'public/users' });
        form.parse(req, (err, fields, files) => {
            console.log("DENTRO DO PARSE DO FORMIDABLE")
            console.log({ err, fields, files })
            if (err) {
                // reject(err)
                return res.json({ err })
            }
            const usersRepository = dbConnection.getRepository(UserSchema);
            usersRepository.save({
                name: fields.name,
                email: fields.email,
                image: 'users/'+ files.meuarquivo.newFilename

            })
            res.json({ fields, files });
        })

        
    }
}

module.exports = { UsersController };