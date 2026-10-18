const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'puca1010',
    database: 'musica'
});

connection.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao MySQL:', error);
        return;
    }

    console.log('Conectado ao MySQL!');
});

module.exports = connection;