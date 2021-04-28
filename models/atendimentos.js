const conexao = require('../database/conexao');
const moment = require('moment');
const axios = require('axios');
const repositorio = require('../repositorios/atendimentos');

class Atendimento {
  constructor() {

    this.dataValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
    this.clienteValido = ({tamanho}) => tamanho >= 5;

    this.validacoes = [
      {
        nome: "data",
        valido: this.dataValida,
        mensagem: "Data inválida - a data deve ser maior ou igual a data atual."
      },
      {
        nome: "cliente",
        valido: this.clienteValido,
        mensagem: "Cliente inválido - O nome do cliente deve ter pelo menos 5 caracteres."
      }
    ];

    this.validaDados = (params) => this.validacoes.filter(campo => {
      const { nome } = campo;
      const parametro = params[nome];
      return !campo.valido(parametro);
    })
  }

  adiciona (atendimento) {

    const dataCriacao = new Date();
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const params = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length }
    }
    const buscaErros = this.validaDados(params);
    const erros = buscaErros.length > 0;

    if (erros) {
      return new Promise((resolve, reject) => {
        reject(erros);
      });

    } else {
      const atendimentoDatado = {...atendimento, dataCriacao, data};
      return repositorio.adiciona(atendimentoDatado)
        .then((resultados) => {
          const id = resultados.insertId;
          return { ...atendimento, id }
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
    conexao.query(sql, async (error, result) => {
      const atendimento = result[0];
      const cpf = atendimento.cliente;
      if (error) {
        res.status(400).json(error);
      } else {
        //buscar informações do cliente no servico de clientes por cpf e colocar dados no obj atendimento
        const { data } = await axios.get('http://localhost:8082/'+cpf);
        atendimento.cliente = data;
        res.status(200).json(atendimento);
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
          res.status(200).json({...valores, id});
      }
    });
  }

  deleta(id, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?';
    conexao.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
          res.status(200).json({id});
      }
    });
  }
}

module.exports = new Atendimento;
