const itinerariesRouter = require(`express`).Router();

const itinerariesControllers = require(`../controllers/itineraryControllers`);

const {
  cargarItinerary,
  cargarCiudadItinerary,
  cargarUnItinerary,
  subirItinerary,
  borrarItinerary,
  modificarItinerary,
} = itinerariesControllers;

itinerariesRouter
  .route(`/itineraries`)
  .get(cargarItinerary)
  .post(cargarUnItinerary);

itinerariesRouter
  .route(`/itineraries/:id`)
  .delete(borrarItinerary)
  .put(modificarItinerary)
  .get(subirItinerary);

itinerariesRouter.route(`/cityItineraries`).get(cargarCiudadItinerary);

module.exports = itinerariesRouter;
