const DetalleVentaBoleto = require('../models/postgres/DetalleVentaBoleto');

const DetalleVentaBoletoService = {
  async getAll() {
    return DetalleVentaBoleto.getAll();
  },

  async getById(id) {
    const item = await DetalleVentaBoleto.getById(id);
    if (!item) throw { status: 404, message: 'Detalle de boleto no encontrado' };
    return item;
  },

  async create(data) {
    const { venta_id, funcion_id, asiento_id, precio_unitario } = data;
    if (!venta_id || !funcion_id || !asiento_id || precio_unitario === undefined) {
      throw { status: 400, message: 'Campos obligatorios: venta_id, funcion_id, asiento_id, precio_unitario' };
    }
    return DetalleVentaBoleto.create(data);
  },

  async delete(id) {
    await this.getById(id);
    return DetalleVentaBoleto.delete(id);
  },

  async findByVenta(ventaId) {
    return DetalleVentaBoleto.findByVenta(ventaId);
  },
};

module.exports = DetalleVentaBoletoService;
