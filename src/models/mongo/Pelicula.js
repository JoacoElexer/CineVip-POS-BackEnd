const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
  },
  sinopsis: {
    type: String,
    trim: true,
  },
  generos: [{
    type: String,
    trim: true,
  }],
  clasificacion: {
    type: String,
    enum: ['A', 'B', 'B15', 'C', 'D'],
  },
  duracion: {
    type: Number,
    min: [1, 'La duración debe ser positiva'],
  },
  director: {
    type: String,
    trim: true,
  },
  actores: [{
    type: String,
    trim: true,
  }],
  poster_url: {
    type: String,
    trim: true,
  },
  trailer_url: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
  collection: 'peliculas',
});

peliculaSchema.index({ titulo: 'text', sinopsis: 'text' });

module.exports = mongoose.model('Pelicula', peliculaSchema);
