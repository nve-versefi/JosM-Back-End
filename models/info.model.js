const mongoose = require('mongoose');

const infoaSchema = new mongoose.Schema({
  parrafo: String,
  titulo: String,
  contenido: String
});

const Info = mongoose.model('info', infoaSchema);

module.exports = Info;
