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

  lista() {
    return repositorio.lista();
  }

  buscaPorId(id) {

    //return repositorio.buscaPorId(id);
    return repositorio.buscaPorId(id)
      .then( async (resultados) => {
        const atendimento = resultados[0];
        const cpf = atendimento.cliente;
        const { data } = await axios.get('http://localhost:8082/'+cpf);
        atendimento.cliente = data;
        return { atendimento }
      })
      .catch((error) => {
        return {error}
      })
  }

  altera(id, valores) {

    //ajusta formato de data para o banco se houver
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    return repositorio.altera(id, valores);
  }

  deleta(id) {
    return repositorio.deleta(id);
  }
}

module.exports = new Atendimento;
