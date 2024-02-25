const mongoose = require('mongoose');

const eventosSchema = new mongoose.Schema({
  color: String,
  imgSrc: {
    type: String,
    required: true,
  },
  
  title: String,
  date: String,
  description: String,
  tag: String,
  duration: String,

});

const Eventos = mongoose.model('Eventos', eventosSchema);

module.exports = Eventos;
