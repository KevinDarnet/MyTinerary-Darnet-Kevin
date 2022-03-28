const Itinerary = require("../models/itineraries");

const itineraryController = {
  cargarItinerary: async (req, res) => {
    //console.log(req);
    const data = await Itinerary.find().populate("cityId");
    res.json({
      response: data,
    });
  },
  cargarCiudadItinerary: async (req, res) => {
    try {
      const itineraryPerCity = await Itinerary.find({
        cityId: req.query.cityId,
      });
      res.json({ response: itineraryPerCity });
    } catch (error) {
      console.log(error);
    }
  },
  cargarUnItinerary: async (req, res) => {
    const id = req.params.id;
    const data = await Itinerary.findOne({ _id: id });
    res.json({ response: data });
  },
  subirItinerary: (req, res) => {
    const { image, name, username, details, price, hashtag, duration, cityId } =
      req.body;
    new Itinerary({
      image,
      name,
      username,
      details,
      price,
      hashtag,
      duration,
      cityId,
    })
      .save()
      .then((respuesta) => res.json({ respuesta }));
  },
  borrarItinerary: async (req, res) => {
    const id = req.params.id;
    await Itinerary.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },
  modificarItinerary: async (req, res) => {
    const id = req.params.id;
    const itinerary = req.body;

    await Itinerary.findOneAndUpdate({ _id: id }, itinerary).then((respuesta) =>
      res.json({ respuesta })
    );
  },
  likeDislike: async (req, res) => {
    const id = req.params.id; //LLEGA POR PARAMETRO DESDE AXIOS
    const user = req.user.id; //LLEGA POR RESPUESTA DE PASSPORT
    console.log(user);
    console.log(id);
    await Itinerary.findOne({ _id: id })

      .then((itinerary) => {
        console.log(itinerary);
        if (itinerary.likes.includes(user)) {
          Itinerary.findOneAndUpdate(
            { _id: id },
            { $pull: { likes: user } },
            { new: true }
          ) //PULL QUITA, SACA
            .then((response) =>
              res.json({ success: true, response: response.likes })
            )
            .catch((error) => console.log(error));
        } else {
          Itinerary.findOneAndUpdate(
            { _id: id },
            { $push: { likes: user } },
            { new: true }
          ) //PUSH AGREGA
            .then((response) =>
              res.json({ success: true, response: response.likes })
            )
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => res.json({ success: false, response: error }));
  },
};
module.exports = itineraryController;
