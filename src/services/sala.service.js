const Sala = require('../models/postgres/Sala');

const SalaService = {
  async getAll() {
    return Sala.getAll();
  },

  async getById(id) {
    const sala = await Sala.getById(id);
    if (!sala) throw { status: 404, message: 'Sala no encontrada' };
    return sala;
  },

  async create(data) {
    const { nombre, capacidad, tipo } = data;
    if (!nombre || !capacidad || !tipo) {
      throw { status: 400, message: 'Todos los campos obligatorios: nombre, capacidad, tipo' };
    }
    return Sala.create({ nombre, capacidad, tipo });
  },

  async update(id, data) {
    await this.getById(id);
    return Sala.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Sala.delete(id);
  },
};

module.exports = SalaService;
