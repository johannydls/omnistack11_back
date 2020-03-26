const { Router } = require('express');
const routes = Router();

routes.post('/users', (req, res) => {
  return res.json({
    evento: 'Semana Omnistack 11.0',
    aluno: 'Johanny'
  });
});

module.exports = routes;