const express = require('express');
const consign = require('consign');

//configurar o express
module.exports = () => {
  const app = express();
  consign().include('controllers').into(app);
  return app;
}
