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
        }
    },
    relations: {
        myhobbies: {
            target: "Hobby",
            type: "one-to-many",
            inverseSide: 'user',
        },
    },
})


const HobbiesSchema = new EntitySchema({
    name: "Hobby", 
    tableName: "hobbies", 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        frequency: {
            type: "int",
            nullable: true
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: 'userId',
                referencedColumnName: 'id'
            },
            // cascade: true,
        },
    },

})

const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "teste02.db",
    synchronize: true,
    // entities: [require("./entity/Post"), require("./entity/Category")],
    entities: [UserSchema, HobbiesSchema]
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
        relations: ['myhobbies']
    });
    return res.json(user);
});

app.get('/hobby/:id', async (req, res) => {
    const id = req.params.id
    const hobbiesRepo = dataSource.getRepository(HobbiesSchema);
    const user = await hobbiesRepo.findOne({
        where: {
            id
        },
        relations: ['user']
    });
    return res.json(user);
});


app.get('/users-delete/:id', async (req, res) => {
    const id = req.params.id;
    const usersRepository = dataSource.getRepository(UserSchema);
    usersRepository.delete({ id });
    return res.redirect('/');
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