const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
  const tiposValidos = ['jpg','png','jpeg','gif'];
  const tipoArquivo = path.extname(caminho);
  const tipoArquivoValido = tiposValidos.indexOf(tipoArquivo.substring(1)) !== -1;

  if(!tipoArquivoValido) {
    const erro = 'Tipo inválido'
    console.log('Erro - TIPO INVÁLIDO');
    callbackImagemCriada(erro);
  } else {
    const novoCaminho = './assets/img/'+nomeDoArquivo+tipoArquivo;
    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(novoCaminho))
      .on('finish', () => callbackImagemCriada(false, novoCaminho));
  }

}



/** fs.readFile('./assets/chico.jpg', (error,buffer) => {
  console.log('imagem bufferizada');
  console.log(buffer);

  fs.writeFile('./assets/chico2.jpg', buffer, (error) => {
    console.log('imagem escrita');
  });
});
*/
