const formidable = require("formidable");
const { dbConnection } = require("../config/database-connection");
const { UserSchema } = require("./users-schema");
const { getRandomName } = require("../services/swapi/get-random-name");
const { getCityAndWeather } = require("../services/openweather/get-city-and-weather");
const { uploadFileToS3 } = require("../services/s3/upload-file");

class UsersController {

    constructor() {
       // this.usersRepository = dbConnection.getRepository(UserSchema);
    }


    async lista(req, res) {
        const usersRepository = dbConnection.getRepository(UserSchema);
        const users = await usersRepository.find();

        const bucket = 'https://tads-2022-webii.s3.amazonaws.com/'
        return res.render('users/listagem', { users, bucket });
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
        const name = await getRandomName();
        console.log({
            msg: `Mostra Criacao`, 
            name });

        const cityWeather = await getCityAndWeather('96030700');
        
        return res.render('users/criacao', { nickname: name, cityWeather });
    }

    async cria(req, res) {
        console.log("BODY");
        console.log({ body: req.body });

        const form = formidable({ multiples: true, uploadDir: 'public/users' });
        form.parse(req, async (err, fields, files) => {
            console.log("DENTRO DO PARSE DO FORMIDABLE")
            console.log({ err, fields, files })
            if (err) {
                // reject(err)
                return res.json({ err })
            }

            // upload da imagem do usuario
            await uploadFileToS3(files.meuarquivo.newFilename);

            const usersRepository = dbConnection.getRepository(UserSchema);
            await usersRepository.save({
                name: fields.name,
                email: fields.email,
                image: files.meuarquivo.newFilename

            })
            res.json({ fields, files });
        })

        
    }
}

module.exports = { UsersController };