class Tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criaAtendimentos();
  }

  criaAtendimentos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, ' +
      'cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, ' +
      'data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, ' +
      'obs text, PRIMARY KEY(id))';
    this.conexao.query(sql, (error) => {
      if(error) {
        console.log(error);
      } else {
        console.log('Tabela atendimentos criada com sucesso');
      }
    });
  }
}

module.exports =  new Tabelas;