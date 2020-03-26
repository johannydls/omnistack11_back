const connection = require('../database/connection');

module.exports = {

  async index(req, res) {

    const { page = 1 } = req.query;
    const limit = 5;
    const previousPage = Number(page) - 1;
    const nextPage = Number(page) + 1;

    /*const countPrevious = await connection('incidents').limit(5).offset((previousPage) * limit);
    const countNext = await connection('incidents').limit(5).offset((nextPage) * limit);*/

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(limit)
      .offset((page - 1) * limit)
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);
    return res.json({
      total: count['count(*)'],
      page: page,
      /*hasPrevious: previousPage === 0 ? false : (countPrevious.length > 0 ? true : false),
      hasNext: countNext.length > 0 ? true : false,
      previousPage: previousPage === 0 ? null : (countPrevious.length > 0 ? previousPage : null),
      nextPage: countNext.length > 0 ? nextPage : null,*/
      documents: incidents
    });
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}