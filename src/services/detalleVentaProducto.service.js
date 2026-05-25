const DetalleVentaProducto = require('../models/postgres/DetalleVentaProducto');

const DetalleVentaProductoService = {
  async getAll() {
    return DetalleVentaProducto.getAll();
  },

  async getById(id) {
    const item = await DetalleVentaProducto.getById(id);
    if (!item) throw { status: 404, message: 'Detalle de producto no encontrado' };
    return item;
  },

  async create(data) {
    const { venta_id, producto_id, cantidad, precio_unitario, importe } = data;
    if (!venta_id || !producto_id || !cantidad || precio_unitario === undefined || importe === undefined) {
      throw { status: 400, message: 'Campos obligatorios: venta_id, producto_id, cantidad, precio_unitario, importe' };
    }
    return DetalleVentaProducto.create(data);
  },

  async delete(id) {
    await this.getById(id);
    return DetalleVentaProducto.delete(id);
  },

  async findByVenta(ventaId) {
    return DetalleVentaProducto.findByVenta(ventaId);
  },
};

module.exports = DetalleVentaProductoService;
