const conexao = require('../database/conexao');

class Pet {
  adiciona(pet, res) {
    const sql = 'INSERT INTO Pets SET ?';
    conexao.query(sql, pet, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
          res.status(200).json(pet);
      }
    });
  }
}

module.exports = new Pet;
