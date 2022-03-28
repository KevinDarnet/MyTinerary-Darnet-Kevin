const Activities = require("../models/activities");

const activitiesController = {
  getActivities: async (req, res) => {
    //console.log(req);
    const data = await Activities.find().populate("itineraryId");
    res.json({
      response: data,
    });
  },
  /* activitiesPerCity: async (req, res) => {
    try {
      const ActivitiesPerCity = await Activities.find({
        itineraryId: req.query.itineraryId,
      });
      res.json({ response: ActivitiesPerCity });
    } catch (error) {
      console.log(error);
    }
  }, */
  getActivityPerItinerary: async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    try {
      const data = await Activities.find({ itineraryId: id });
      console.log(data);
      res.json({ success: true, response: data });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: error.message });
    }
  },
  upActivities: (req, res) => {
    const { image, name, description, itineraryId } = req.body;
    new Activities({
      image,
      name,
      description,
      itineraryId,
    })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  deleteActivity: async (req, res) => {
    const id = req.params.id;
    await Activities.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },
  modifyActivity: async (req, res) => {
    const id = req.params.id;
    const Activities = req.body;

    await Activities.findOneAndUpdate({ _id: id }, Activities).then(
      (respuesta) => res.json({ respuesta })
    );
  },
};
module.exports = activitiesController;
