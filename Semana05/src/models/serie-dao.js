const { db } = require("../database/dbconnection");

async function listaSeries() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM midias`, (error, rows) => {
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

module.exports = {
    listaSeries
}