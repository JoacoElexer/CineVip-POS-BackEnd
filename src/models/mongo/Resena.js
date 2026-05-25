const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  pelicula_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pelicula',
    required: [true, 'La película es obligatoria'],
    index: true,
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PerfilUsuario',
    required: [true, 'El usuario es obligatorio'],
    index: true,
  },
  calificacion: {
    type: Number,
    required: [true, 'La calificación es obligatoria'],
    min: [1, 'La calificación mínima es 1'],
    max: [5, 'La calificación máxima es 5'],
  },
  comentario: {
    type: String,
    trim: true,
    maxlength: [1000, 'El comentario no puede exceder 1000 caracteres'],
  },
}, {
  timestamps: true,
  collection: 'resenas',
});

resenaSchema.index({ pelicula_id: 1, usuario_id: 1 }, { unique: true });

module.exports = mongoose.model('Resena', resenaSchema);
