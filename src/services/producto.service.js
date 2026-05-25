const Producto = require('../models/postgres/Producto');

const ProductoService = {
  async getAll() {
    return Producto.getAll();
  },

  async getById(id) {
    const producto = await Producto.getById(id);
    if (!producto) throw { status: 404, message: 'Producto no encontrado' };
    return producto;
  },

  async create(data) {
    const { categoria_id, nombre, precio } = data;
    if (!categoria_id || !nombre || precio === undefined) {
      throw { status: 400, message: 'Campos obligatorios: categoria_id, nombre, precio' };
    }
    return Producto.create(data);
  },

  async update(id, data) {
    await this.getById(id);
    return Producto.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Producto.delete(id);
  },

  async findByCategoria(categoriaId) {
    return Producto.findByCategoria(categoriaId);
  },
};

module.exports = ProductoService;
