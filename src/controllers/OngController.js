const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

  async index(req, res) {
    const ongs = await connection.table('ongs').select('*');
    return res.json(ongs);
  },

  async create(req, res) {
    const { name, initials, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    try {
      await connection('ongs').insert({
        id, name, initials, email, whatsapp, city, uf
      });

      return res.json({ id });
    } catch(err) {
      console.log(err);
      return res.status(400).send({ err });
    }
  }
}