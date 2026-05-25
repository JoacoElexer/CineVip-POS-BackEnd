const MetodoPago = require('../models/postgres/MetodoPago');

const MetodoPagoService = {
  async getAll() {
    return MetodoPago.getAll();
  },

  async getById(id) {
    const item = await MetodoPago.getById(id);
    if (!item) throw { status: 404, message: 'Método de pago no encontrado' };
    return item;
  },

  async create(data) {
    const { venta_id, tipo_pago, monto_pagado } = data;
    if (!venta_id || !tipo_pago || monto_pagado === undefined) {
      throw { status: 400, message: 'Campos obligatorios: venta_id, tipo_pago, monto_pagado' };
    }
    return MetodoPago.create(data);
  },

  async delete(id) {
    await this.getById(id);
    return MetodoPago.delete(id);
  },

  async findByVenta(ventaId) {
    return MetodoPago.findByVenta(ventaId);
  },
};

module.exports = MetodoPagoService;
