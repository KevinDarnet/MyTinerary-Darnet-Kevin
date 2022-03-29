const Router = require("express").Router();

const itinerariesRouter = require(`express`).Router();
const passport = require("../config/passport");

const itinerariesControllers = require(`../controllers/itineraryControllers`);
const commentsControllers = require("../controllers/commentsControllers");
const { addComment, modifiComment, deleteComment } = commentsControllers;
const {
  cargarItinerary,
  cargarCiudadItinerary,
  cargarUnItinerary,
  subirItinerary,
  borrarItinerary,
  modificarItinerary,
  likeDislike,
  prueba,
} = itinerariesControllers;

itinerariesRouter
  .route(`/itineraries`)
  .get(cargarItinerary)
  .post(cargarUnItinerary);

itinerariesRouter
  .route(`/itineraryId/:id`)
  .delete(borrarItinerary)
  .put(modificarItinerary)
  .get(subirItinerary);
//LIKES ROUTES
itinerariesRouter
  .route("/like/:id")
  .put(passport.authenticate("jwt", { session: false }), likeDislike)
  .get(prueba);

//Itineraries Comments ROUTES
itinerariesRouter
  .route("/itinerary/comment")
  .post(passport.authenticate("jwt", { session: false }), addComment)
  .put(passport.authenticate("jwt", { session: false }), modifiComment);

itinerariesRouter
  .route("/itinerary/comment/:id")
  .post(passport.authenticate("jwt", { session: false }), deleteComment);
itinerariesRouter.route(`/cityItineraries`).get(cargarCiudadItinerary);

module.exports = itinerariesRouter;
