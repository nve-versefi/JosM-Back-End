const mongoose = require('mongoose');

const integrantesSchema = new mongoose.Schema({
  nombre: String,
  puesto: String,
  bolsa: String,
  descripcion: String,
  RedesSociales: String,
  SitioWeb: String,
  CanalYoutube: String
});

const Integrante = mongoose.model('Integrante', integrantesSchema);

module.exports = Integrante;
