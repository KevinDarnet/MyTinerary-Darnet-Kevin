const Itinerarios = require("../models/itineraries");

const itineraryController = {
  cargarItinerary: async (req, res) => {
    //console.log(req);
    const data = await Itinerarios.find().populate("cityId");
    res.json({
      response: data,
    });
  },
  cargarCiudadItinerary: async (req, res) => {
    try {
      const itineraryPerCity = await Itinerarios.find({
        cityId: req.query.cityId,
      });
      res.json({ response: itineraryPerCity });
    } catch (error) {
      console.log(error);
    }
  },
  cargarUnItinerary: async (req, res) => {
    const id = req.params.id;
    const data = await Itinerarios.findOne({ _id: id });
    res.json({ response: data });
  },
  subirItinerary: (req, res) => {
    const { image, name, username, details, price, hashtag, duration, cityId } =
      req.body;
    new Itinerarios({
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
    await Itinerarios.findOneAndDelete({ _id: id }).then((respuesta) =>
      res.json({ respuesta })
    );
  },
  modificarItinerary: async (req, res) => {
    const id = req.params.id;
    const itinerary = req.body;

    await Itinerarios.findOneAndUpdate({ _id: id }, itinerary).then(
      (respuesta) => res.json({ respuesta })
    );
  },
  likeDislike: async (req, res) => {
    const id = req.params.id; //LLEGA POR PARAMETRO DESDE AXIOS
    console.log(req.params.id);

    console.log(req.user);
    const user = req.user.id; //LLEGA POR RESPUESTA DE PASSPORT
    console.log(user);

    try {
      await Itinerarios.findOne({ _id: req.params.id })
        .then((itinerary) => {
          console.log(itinerary);
          if (itinerary.likes.includes(user)) {
            Itinerarios.findOneAndUpdate(
              { _id: req.params.id },
              { $pull: { likes: user } },
              { new: true }
            ) //PULL QUITA, SACA
              .then((response) =>
                res.json({ success: true, response: response.likes })
              )
              .catch((error) => console.log(error));
          } else {
            Itinerarios.findOneAndUpdate(
              { _id: req.params.id },
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
    } catch (error) {
      res.json({ success: false, response: error.message });
    }
  },
  prueba: async (req, res) => {
    const data = await Itinerarios.find().populate("cityId");
    res.json({
      response: data,
    });
  },
};
module.exports = itineraryController;
