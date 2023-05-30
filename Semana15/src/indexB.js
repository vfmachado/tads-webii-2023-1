const typeorm = require("typeorm")

const EntitySchema = require("typeorm").EntitySchema

const UserSchema =  new EntitySchema({
    name: "User", // Will use table name `category` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            nullable: true
        },
        nickname: {
            type: "varchar",
            nullable: true,
        }
    },
    relations: {
        // CONEXOES ENTRE DOIS USUARIOS, O PROPRIO ORM GERA UMA TABELA PARA NOS, NESTE CASO users_connections_users INDICANDO QUE E UMA TABELA INTERMEDIARIA ENTRE users
        // EXISTE A POSSIBILIDADE DE COMBINAR ESTES DOIS EXEMPLOS
        // UTILIZAR UMA TABELA INTERMEDIARIA DEFINIDA POR NÓS.
        connections: {
            joinTable: true,
            target: "User",
            type: "many-to-many",
        }
    }
})
    
const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "teste03.db",
    synchronize: true,
    logging: true,
    // entities: [require("./entity/Post"), require("./entity/Category")],
    entities: [UserSchema]
});
 

const express = require('express');
const app = express();

app.get('/', async (req, res) => {

    const usersRepository = dataSource.getRepository(UserSchema);
    const users = await usersRepository.find();

    return res.json({ users });
});

app.get('/insere-user', async (req, res) => {
    const { name, email } = req.query;

    try {
        const usersRepository = dataSource.getRepository(UserSchema);
        await usersRepository.save({
            name, email
        });
        return res.json({ msg: "deu tudo certo"});
    } catch (error) {
        return res.json(error);
    }

});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const usersRepository = dataSource.getRepository(UserSchema);
    const user = await usersRepository.findOne({
        where: {
            id
        },
        relations: ['connections']
    });
    return res.json(user);
});


dataSource.initialize()
    .then(ok => {
        console.log({ ok });
        app.listen(3000, () => {
            console.log('Tudo ok, escutando na porta 3000');
        })
    })
    .catch(error => {
        console.log(" === ERRO INICIANDO O BANCO DE DADOS");
        console.log({ error });
    })