const { EntitySchema } = require("typeorm");

// USER SCHEMA - DEFINE O MODELO DE USUARIO NO BANCO
// O ORM GERA A TABELA PARA NÓS
const UserSchema =  new EntitySchema({
    name: "User", 
    tableName: "users",
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
        image: {
            type: "varchar",
            nullable: true
        }
    }
});

module.exports = { UserSchema };