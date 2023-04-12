console.log("FUNCIONA");

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./meu-banco.db');

// db.run("CREATE TABLE lorem (info TEXT)");


// db.all('SELECT * FROM midias', (error, rows) => {
//     if (error) {
//         console.error("HOUVE UM ERRO AO CONSULTAR OS DADOS");
//         console.error({ error });
//     }
//     console.log({ rows });
// });

const serie = {
    name: "The last of us",
    description: "Tem varios ultimos",
    img_url: "EMPTY"
};

// INSERT INTO table (column1,column2 ,..) VALUES( value1,	value2 ,...);
// const sql = 'INSERT INTO midias (name, description, img_url) VALUES( ?, ?, ?)';
// db.run(sql, [serie.name, serie.description, serie.img_url], (err) => {
//     console.log({ err });
// })

function insereNoBanco(serie) {
    const sql = 'INSERT INTO midias (name, description, img_url) VALUES( ?, ?, ?)';
    db.run(sql, [serie.name, serie.description, serie.img_url], (err) => {
        console.log({ err });
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function fingindoBanco(serie) {
    await sleep(3000);
    console.log('Fingi que inseri ' + serie.name);
    // return true; // deu tudo certo
    return new Promise(resolve => resolve(true));
}

const s1 = {
    name: "Ricky and Morty",
    description: "Fumados",
    img_url: "EMPTY"
};


async function consultaBanco(table) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${table}`, (error, rows) => {
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

(async () => {
    try {
        const resultadoConsulta = await consultaBanco('usuarios');
        console.log({ resultadoConsulta })
    } catch (error) {
        console.log("TABELA NAO ENCONTRADA");
    }
})();




