const mysql = require('mysql2');
require('dotenv/config');

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 3306,
  password: process.env.DB_PASS,
  database: 'agenda-petshop2'
});

module.exports = conexao;
