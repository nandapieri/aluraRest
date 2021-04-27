const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

//configurar o express
module.exports = () => {
  const app = express();

  //app pronta pra receber tanto dados de de form (urlencoded) quanto json
  app.use(bodyParser.urlencoded({extendend: true}));
  app.use(bodyParser.json());

  consign().include('controllers').into(app);
  return app;
}
