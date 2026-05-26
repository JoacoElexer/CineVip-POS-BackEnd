const ReporteCierre = require('../models/mongo/ReporteCierre');

const ReporteCierreService = {
  async getAll() { return ReporteCierre.find().sort({ fecha_cierre: -1 }); },
  async getById(id) { const r = await ReporteCierre.findById(id); if (!r) throw { status: 404, message: 'Reporte no encontrado' }; return r; },
  async create(data) {
    if (!data.fecha_cierre || !data.empleado_id || data.total_ventas === undefined || !data.total_efectivo === undefined || !data.total_tarjeta === undefined || !data.conteo_transacciones === undefined) {
      throw { status: 400, message: 'Campos obligatorios: fecha_cierre, empleado_id, total_ventas, total_efectivo, total_tarjeta, conteo_transacciones' };
    }
    return ReporteCierre.create(data);
  },
  async update(id, data) { const r = await ReporteCierre.findByIdAndUpdate(id, data, { new: true, runValidators: true }); if (!r) throw { status: 404, message: 'Reporte no encontrado' }; return r; },
  async delete(id) { const r = await ReporteCierre.findByIdAndDelete(id); if (!r) throw { status: 404, message: 'Reporte no encontrado' }; return r; },
  async findByFecha(fecha) {
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date(fecha);
    fin.setHours(23, 59, 59, 999);
    return ReporteCierre.find({ fecha_cierre: { $gte: inicio, $lte: fin } }).sort({ fecha_cierre: -1 });
  },
};

module.exports = ReporteCierreService;
