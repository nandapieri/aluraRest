const conexao = require('./conexao');

const executaQuery = (query, params = '') => {
  return new Promise((resolve, reject) => {
    conexao.query(query, params, (error, result, campos) => {
      if(error) {
          reject(error);
      } else {
        resolve(result);
      }
    });
  });

}

module.exports = executaQuery;
