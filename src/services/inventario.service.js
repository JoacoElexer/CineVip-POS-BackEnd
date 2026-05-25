const Inventario = require('../models/postgres/Inventario');

const InventarioService = {
  async getAll() {
    return Inventario.getAll();
  },

  async getById(id) {
    const item = await Inventario.getById(id);
    if (!item) throw { status: 404, message: 'Registro de inventario no encontrado' };
    return item;
  },

  async create(data) {
    const { producto_id } = data;
    if (!producto_id) throw { status: 400, message: 'producto_id es obligatorio' };
    return Inventario.create(data);
  },

  async update(id, data) {
    await this.getById(id);
    return Inventario.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Inventario.delete(id);
  },

  async getByProducto(productoId) {
    const item = await Inventario.getByProducto(productoId);
    if (!item) throw { status: 404, message: 'Inventario no encontrado para ese producto' };
    return item;
  },

  async ajustarStock(productoId, cantidad) {
    const item = await Inventario.getByProducto(productoId);
    if (!item) throw { status: 404, message: 'Inventario no encontrado para ese producto' };
    if (item.stock_actual + cantidad < 0) {
      throw { status: 400, message: 'Stock insuficiente' };
    }
    return Inventario.ajustarStock(productoId, cantidad);
  },
};

module.exports = InventarioService;
