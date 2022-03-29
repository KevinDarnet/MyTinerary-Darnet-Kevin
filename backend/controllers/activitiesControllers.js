const Activities = require("../models/activities");

const activitiesController = {
  getActivities: async (req, res) => {
    const data = await Activities.find().populate("itineraryId");
    res.json({
      response: data,
    });
  },

  getActivityPerItinerary: async (req, res) => {
    try {
      const data = await Activities.find({ itineraryId: req.params.id });
      res.json({ success: true, response: data });
    } catch (error) {
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
