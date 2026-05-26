const Producto = require('../models/postgres/Producto');

const ProductoService = {
  async getAll() { return Producto.getAll(); },
  async getById(id) { const p = await Producto.getById(id); if (!p) throw { status: 404, message: 'Producto no encontrado' }; return p; },
  async create(data) { if (!data.categoria_id || !data.nombre || data.precio_unitario === undefined) throw { status: 400, message: 'Campos obligatorios: categoria_id, nombre, precio_unitario' }; return Producto.create(data); },
  async update(id, data) { await this.getById(id); return Producto.update(id, data); },
  async delete(id) { await this.getById(id); return Producto.delete(id); },
  async ajustarStock(id, cantidad) {
    const p = await Producto.getById(id); if (!p) throw { status: 404, message: 'Producto no encontrado' };
    if (p.stock_actual + cantidad < 0) throw { status: 400, message: 'Stock insuficiente' };
    return Producto.ajustarStock(id, cantidad);
  },
  async findByCategoria(categoriaId) { return Producto.findByCategoria(categoriaId); },
};

module.exports = ProductoService;
