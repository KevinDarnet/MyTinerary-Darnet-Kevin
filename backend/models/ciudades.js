const mongoose = require("mongoose");

const ciudadesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  coin: { type: String, required: true },
});
const Ciudades = mongoose.model("ciudades", ciudadesSchema);
module.exports = Ciudades;
