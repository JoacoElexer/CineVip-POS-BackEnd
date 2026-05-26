const DetalleVenta = require('../models/postgres/DetalleVenta');

const DetalleVentaService = {
  async getAll() { return DetalleVenta.getAll(); },
  async getById(id) { const d = await DetalleVenta.getById(id); if (!d) throw { status: 404, message: 'Detalle no encontrado' }; return d; },
  async create(data) { if (!data.venta_id || !data.tipo_item || !data.item_id || !data.cantidad || data.precio_unitario === undefined) throw { status: 400, message: 'Campos obligatorios: venta_id, tipo_item, item_id, cantidad, precio_unitario' }; return DetalleVenta.create(data); },
  async delete(id) { await this.getById(id); return DetalleVenta.delete(id); },
  async findByVenta(ventaId) { return DetalleVenta.findByVenta(ventaId); },
};

module.exports = DetalleVentaService;
