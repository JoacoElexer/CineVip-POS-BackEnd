const mongoose = require('mongoose');

const perfilUsuarioSchema = new mongoose.Schema({
  nombre_completo: { type: String, required: true, trim: true },
  puntos_acumulados: { type: Number, default: 0, min: 0 },
  nivel_membresia: { type: String, enum: ['Oro', 'Platino', 'VIP'], default: 'Oro' },
}, { timestamps: true, collection: 'perfiles_usuario' });

module.exports = mongoose.model('PerfilUsuario', perfilUsuarioSchema);
