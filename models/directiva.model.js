const mongoose = require('mongoose');

const directivaSchema = new mongoose.Schema({
  nombre: String,
  dni: String,
  fechaNacimiento: String,
  direccion: String,
});

const Directiva = mongoose.model('Directiva', directivaSchema, 'Directiva');

module.exports = Directiva;
