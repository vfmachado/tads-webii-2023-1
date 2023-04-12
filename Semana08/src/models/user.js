const { db } = require("../database/dbconnection");

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = 'CLIENTE';
    }
}

async function insereUser(user) {

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (name, email, password, role) VALUES( ?, ?, ?, ?)';
            db.run(sql, [user.name, user.email, user.password, user.role], (err) => {
                console.log({ err });
                if (err) {
                    console.log({ err });
                    reject(err);
                }
                resolve();
            })
    })
}

async function listaUsers() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, (error, rows) => {
            if (error) {
                console.error("HOUVE UM ERRO AO CONSULTAR OS DADOS");
                console.error({ error });
                reject(error);
            }
            // console.log({ rows });
            resolve(rows);
        });
    })
}


async function buscaUser(email) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users WHERE email = ?`, [email], (error, rows) => {
            if (error) {
                console.error("HOUVE UM ERRO AO CONSULTAR OS DADOS");
                console.error({ error });
                reject(error);
            }
            if (rows.length > 0) {
                resolve(rows[0]);
            } else {
                reject(null);
            }
        });
    })
}

module.exports = { User, insereUser, listaUsers, buscaUser };
