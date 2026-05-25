const Categoria = require('../models/postgres/Categoria');

const CategoriaService = {
  async getAll() {
    return Categoria.getAll();
  },

  async getById(id) {
    const categoria = await Categoria.getById(id);
    if (!categoria) throw { status: 404, message: 'Categoría no encontrada' };
    return categoria;
  },

  async create(data) {
    const { nombre } = data;
    if (!nombre) throw { status: 400, message: 'El nombre es obligatorio' };
    return Categoria.create({ nombre });
  },

  async update(id, data) {
    await this.getById(id);
    return Categoria.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Categoria.delete(id);
  },
};

module.exports = CategoriaService;
