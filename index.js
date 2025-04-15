const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
 
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
 
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
app.get('/listar', (req, res) => {
    const listar = 'SELECT * FROM viagens';
    connection.query(listar, (err, rows) => {
        if (!err) {
            console.log("Consulta realizada com sucesso!");
                res.send(`
                    <html>
                        <head>
                    <title>Relatório de estoque</title>
                        </head>
                    <body>
                        <h1>Relatório de estoque</h1>
                        <table>
                        <tr>
                            <th>ID</th>
                            <th>Destino</th>
                            <th>Data Viagem</th>
                            <th>Preço</th>
                            <th>Vagas</th>
                            <th>Ações</th>
                        </tr>
                    ${rows.map(row => `
                        <tr>
                         <td> ${row.id} </td>
                         <td> ${row.destino} </td>
                         <td> ${row.data_viagem} </td>
                         <td> ${row.preco} </td>
                         <td> ${row.vagas} </td>
                         <td>
                            <a href="/excluir/${row.id}">Excluir<a/>
                             <a href="/editar/${row.id}">Editar<a/>
                        </tr>
                       
                        `).join('')}
                        </table>
                        <br> <button onclick="window.location.href='/'">Voltar</button>
                    </body>
 
                    </html>
                `);
        } else {
            console.error('Erro ao listar viagens:', err);
            res.status(500).send('Erro ao listar viagens.');
        }
    });
});
 
app.get('/excluir/:id', function(req,res){
    const id = req.params.id;
 
    connection.query('DELETE FROM viagens WHERE id =?', [id], function(err, result){
        if (err){
            console.error('Erro ao excluir a viagem: ', err);
            return;
        }
 
        console.log("Viagem excluída com sucesso!");
        res.redirect('/listar');
 
    });
});
 
 
app.get('/editar/:id', function(req, res){
    const id = req.params.id; // Obtém o ID do produto a ser editado da URL
    const select = "SELECT * FROM viagens WHERE id = ?";
   
    connection.query(select, [id], function(err, rows){
        if(!err){
            console.log("Viagem encontrada com sucesso!");
            res.send(`
                <html>
                    <head>
                        <title> Editar viagem </title>
                    </head>
                    <body>
                        <h1>Editar produto</h1>
                        <form action="/editar/${id}" method="POST">
                            <label for="destino">Destino:</label><br>
                            <input type="text" name="destino" value="${rows[0].destino}"><br><br>
                            <label for="data_viagem">Data:</label><br>
                            <input type="date" name="data_viagem" value="${rows[0].data_viagem}"><br><br>
                            <label for="preco">Valor:</label><br>
                            <input type="number" name="preco" value="${rows[0].preco}"><br><br>
                            <label for="vagas">Vagas:</label><br>
                            <input type="number" name="vagas" value="${rows[0].vagas}"><br><br>
                            <input type="submit" value="Cadastrar">
                        </form>
                        <button onclick="window.location.href='/listar'">Voltar</button>
                    </body>
                </html>`);
        }else{
            console.log("Erro ao buscar a viagem ", err);
            res.send("Erro")
        }
    });
 
});
 
app.post('/editar/:id', function(req, res){
    const id = req.params.id; // Obtém o ID do produto a ser editado da URL
    const destino = req.body.destino; // Obtém a nova descrição do corpo da requisição
    const data_viagem = req.body.data_viagem; // Obtém a nova quantidade do corpo da requisição
    const preco = req.body.preco;
    const vagas = req.body.vagas; // Obtém o novo valor unitário do corpo da requisição
 
    const update = "UPDATE viagens SET destino = ?, data_viagem = ?, preco = ?, vagas = ? WHERE id = ?";
 
    connection.query(update, [destino, data_viagem, preco, vagas, id], function(err, result){
        if(!err){
            console.log("Viagem editada com sucesso!");
            res.redirect('/listar'); // Redireciona para a página de listagem após a edição
        }else{
            console.log("Erro ao editar a viagem ", err);
            res.send("Erro")
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