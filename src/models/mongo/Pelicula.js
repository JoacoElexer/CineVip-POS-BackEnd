const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  sinopsis: { type: String, trim: true },
  duracion: { type: Number, min: 1 },
  clasificacion: { type: String, enum: ['A', 'B', 'B15', 'C', 'D'] },
  generos: [{ type: String, trim: true }],
}, { timestamps: true, collection: 'peliculas' });

peliculaSchema.index({ titulo: 'text', sinopsis: 'text' });

module.exports = mongoose.model('Pelicula', peliculaSchema);
