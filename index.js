const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'agencia_viagens', 
    port: 3306 
});
 
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados!');
    }
});
 
// Rota para cadastrar viagens
app.post('/viagens', (req, res) => {
    const { destino, data_viagem, preco, vagas } = req.body;
    const sql = 'INSERT INTO viagens (destino, data_viagem, preco, vagas) VALUES (?, ?, ?, ?)';
    connection.query(sql, [destino, data_viagem, preco, vagas], (err, result) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar viagem.');
        } else {
            res.send('Viagem cadastrada com sucesso!');
        }
    });
});
 
// Rota para listar viagens
app.get('/viagens', (req, res) => {
    const listar = 'SELECT * FROM viagens';
    connection.query(listar, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.error('Erro ao listar viagens:', err);
            res.status(500).send('Erro ao listar viagens.');
        }
    });
});

// Rota para a página default
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});
 
// Inicia o servidor
app.listen(8083, () => {
    console.log('Servidor rodando na url http://localhost:8083');
});