const mongoose = require('mongoose');

const perfilUsuarioSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  preferencias_generos: [{
    type: String,
    trim: true,
  }],
  historial_peliculas: [{
    pelicula_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pelicula',
    },
    fecha_vista: Date,
  }],
  membresia: {
    tipo: {
      type: String,
      enum: ['Básica', 'VIP', 'VIP Premium'],
      default: 'Básica',
    },
    fecha_ingreso: {
      type: Date,
      default: Date.now,
    },
    puntos: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
}, {
  timestamps: true,
  collection: 'perfiles_usuario',
});

perfilUsuarioSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('PerfilUsuario', perfilUsuarioSchema);
