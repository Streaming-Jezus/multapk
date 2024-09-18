const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  url: { type: String }, // URL del archivo multimedia
  type: { type: String }, // Movie, Series, Anime, Dorama
});

module.exports = mongoose.model('Content', contentSchema);
