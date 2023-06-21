const { DataSource } = require("typeorm");
const { UserSchema } = require("../users/users-schema");

const dbConnection = new DataSource({
    type: "sqlite",
    database: "teste02.db",
    logging: true,
    synchronize: true,
    // entities: [require("./entity/Post"), require("./entity/Category")],
    entities: [UserSchema]
});

dbConnection.initialize()
.then(ok => {
    console.log('Banco de dados conectado!')
    console.log({ ok });
})
.catch(error => {
    console.log(" === ERRO INICIANDO O BANCO DE DADOS");
    console.log({ error });
})

module.exports = { dbConnection }
