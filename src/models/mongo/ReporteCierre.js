const mongoose = require('mongoose');

const reporteCierreSchema = new mongoose.Schema({
  fecha_cierre: { type: Date, required: true },
  empleado_id: { type: Number, required: true },
  total_ventas: { type: Number, required: true, min: 0 },
  total_efectivo: { type: Number, required: true, min: 0 },
  total_tarjeta: { type: Number, required: true, min: 0 },
  total_propinas: { type: Number, default: 0, min: 0 },
  conteo_transacciones: { type: Number, required: true, min: 0 },
}, { timestamps: true, collection: 'reportes_cierre' });

reporteCierreSchema.index({ fecha_cierre: -1 });
reporteCierreSchema.index({ empleado_id: 1, fecha_cierre: -1 });

module.exports = mongoose.model('ReporteCierre', reporteCierreSchema);
