const customExpress = require('./config/customExpress');
const conexao = require('./database/conexao');
const Tabelas = require('./database/tabelas');
conexao.connect( (error) => {
  if(error) {
    console.log(error);
  } else {
    console.log('Banco de dados conectado');
    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  }
});
