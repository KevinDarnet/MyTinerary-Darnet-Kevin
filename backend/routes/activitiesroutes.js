const Router = require(`express`).Router();

const activitiesControllers = require(`../controllers/activitiesControllers`);

const {
  getActivities,
  getActivityPerItinerary,
  deleteActivity,
  upActivities,
  modifyActivity,
} = activitiesControllers;

Router.route(`/activities`).get(getActivities);

Router.route(`/activities/:id`)
  .delete(deleteActivity)
  .put(modifyActivity)
  .get(upActivities);

Router.route(`/itineraryActivity/:id`).get(getActivityPerItinerary);

module.exports = Router;
