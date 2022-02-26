const Router = require(`express`).Router();

const ciudadesControllers = require(`../controllers/ciudadesControllers`);

const { consultarCiudades } = ciudadesControllers;

Router.route(`/allcities`).get(consultarCiudades);

module.exports = Router;
