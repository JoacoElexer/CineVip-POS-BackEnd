const Promocion = require('../models/postgres/Promocion');

const PromocionService = {
  async getAll() {
    return Promocion.getAll();
  },

  async getById(id) {
    const promocion = await Promocion.getById(id);
    if (!promocion) throw { status: 404, message: 'Promoción no encontrada' };
    return promocion;
  },

  async create(data) {
    const { nombre, descripcion } = data;
    if (!nombre || !descripcion) {
      throw { status: 400, message: 'Campos obligatorios: nombre, descripcion' };
    }
    return Promocion.create(data);
  },

  async update(id, data) {
    await this.getById(id);
    return Promocion.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Promocion.delete(id);
  },

  async findActivas() {
    return Promocion.findActivas();
  },
};

module.exports = PromocionService;
