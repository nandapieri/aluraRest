const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req,res) => {
    Atendimento.lista()
      .then((resultados) => {
        //pode omitir o status(200) pois é padrão
        res.json(resultados);
      })
      .catch((error) => {
        res.status(400).json(error);
      })
  });

  app.get('/atendimentos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    Atendimento.buscaPorId(id)
      .then((atendimento) => {
        res.json(atendimento);
      })
      .catch((error) => {
        res.status(400).json(error);
      })
  });

  app.post('/atendimentos', (req,res) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento)
      .then((atendimentoCadastrado) => {
        res.status(201).json(atendimentoCadastrado);
      })
      .catch((error) => {
        res.status(400).json(error);
      })

  });

  app.patch('/atendimentos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    Atendimento.altera(id, valores)
    .then(() => {
      res.status(200).json({...valores, id});
    })
    .catch((error) => {
      res.status(400).json(error);
    })
  });

  app.delete('/atendimentos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    Atendimento.deleta(id, res)
    .then(() => {
      res.status(200).json({id});
    })
    .catch((error) => {
      res.status(400).json(error);
    })
  });

}
