const { Router } = require('express');
const routes = Router();

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

module.exports = routes;