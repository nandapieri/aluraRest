const fs = require('fs');

fs.createReadStream('./assets/chico.jpg')
  .pipe(fs.createWriteStream('./assets/chico3.jpg'))
  .on('finish', () => {
    console.log('Imagem escrita');
  });

/** fs.readFile('./assets/chico.jpg', (error,buffer) => {
  console.log('imagem bufferizada');
  console.log(buffer);

  fs.writeFile('./assets/chico2.jpg', buffer, (error) => {
    console.log('imagem escrita');
  });
});
*/
