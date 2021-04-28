const query = require('../database/queries');

class Atendimento {
  adiciona(atendimento) {
    const sql = 'INSERT INTO Atendimentos SET ?';
    return query(sql, atendimento);
  }
}

module.exports = new Atendimento;
