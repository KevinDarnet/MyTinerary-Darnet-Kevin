const mongoose = require("mongoose");

const ciudadesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lugar: { type: String, required: true },
});
const Ciudades = mongoose.model("ciudades", ciudadesSchema);
module.exports = Ciudades;
