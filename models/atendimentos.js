const conexao = require('../database/conexao');
const moment = require('moment')

class Atendimento {
  adiciona (atendimento, res) {
    const sql = 'INSERT INTO Atendimentos SET ?';
    const dataCriacao = new Date();
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataValida,
        mensagem: "Data inválida - a data deve ser maior ou igual a data atual."
      },
      {
        nome: "cliente",
        valido: clienteValido,
        mensagem: "Cliente inválido - O nome do cliente deve ter pelo menos 5 caracteres."
      }
    ];

    const buscaErros = validacoes.filter(campo => !campo.valido);
    const erros = buscaErros.length > 0;

    if (erros) {
      res.status(400).json(buscaErros);
    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data};
      conexao.query(sql, atendimentoDatado, (error, result) => {
        if(error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(result);
        }
      });
    }
  }

  lista(res) {
    const sql = 'SELECT * FROM Atendimentos';

    conexao.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
          res.status(200).json(result);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = 'SELECT * FROM Atendimentos WHERE id='+id;
    conexao.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
          res.status(200).json(result[0]);
      }
    });
  }

  altera(id, valores, res) {
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

    //verificar formato de data para o banco  
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    conexao.query(sql, [valores, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
          res.status(200).json(result);
      }
    });
  }
}

module.exports = new Atendimento;
