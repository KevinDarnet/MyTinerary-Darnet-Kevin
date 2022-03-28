const mongoose = require("mongoose");

const itinerariesSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  hashtag: [{ type: String, required: true }],
  likes: { type: String },
  comments: [
    {
      comment: { type: String },
      userID: { type: mongoose.Types.ObjectId, ref: "users" },
    },
  ],
  cityId: { type: mongoose.Types.ObjectId, ref: "ciudades" },
});
const itineraries = mongoose.model("itinerarios", itinerariesSchema);
module.exports = itineraries;
