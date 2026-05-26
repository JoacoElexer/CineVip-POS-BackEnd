const Categoria = require('../models/postgres/Categoria');

const CategoriaService = {
  async getAll() { return Categoria.getAll(); },
  async getById(id) { const c = await Categoria.getById(id); if (!c) throw { status: 404, message: 'Categoría no encontrada' }; return c; },
  async create(data) { if (!data.nombre) throw { status: 400, message: 'El nombre es obligatorio' }; return Categoria.create(data); },
  async update(id, data) { await this.getById(id); return Categoria.update(id, data); },
  async delete(id) { await this.getById(id); return Categoria.delete(id); },
};

module.exports = CategoriaService;
