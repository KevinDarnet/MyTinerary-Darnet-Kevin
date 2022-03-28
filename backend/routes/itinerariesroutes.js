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
Router.route("/api/like/:id").put(
  passport.authenticate("jwt", { session: false }),
  likeDislike
);
//Itineraries Comments ROUTES
Router.route("/itinerary/comment")
  .post(passport.authenticate("jwt", { session: false }), addComment)
  .put(passport.authenticate("jwt", { session: false }), modifiComment);

Router.route("/itinerary/comment/:id").post(
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
itinerariesRouter.route(`/cityItineraries`).get(cargarCiudadItinerary);

module.exports = itinerariesRouter;
