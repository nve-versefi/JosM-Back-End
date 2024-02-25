const mongoose = require('mongoose');

const galeriaSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String
});

const Galeria = mongoose.model('galeria', galeriaSchema);

module.exports = Galeria;
