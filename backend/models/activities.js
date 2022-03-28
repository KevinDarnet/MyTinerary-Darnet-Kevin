const mongoose = require("mongoose");

const activitySchemaa = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  itineraryId: { type: mongoose.Types.ObjectId, ref: "itinerarios" },
});
const Activities = mongoose.model("activities", activitySchemaa);
module.exports = Activities;
