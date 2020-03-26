const { Router } = require('express');
const routes = Router();
const crypto = require('crypto');
const connection = require('./database/connection');

routes.post('/ongs', async (req, res) => {

  const { name, email, whatsapp, city, uf } = req.body;

  const id = crypto.randomBytes(4).toString('HEX');

  await connection('ongs').insert({
    id, name, email, whatsapp, city, uf
  });

  return res.json({ id });
});

module.exports = routes;