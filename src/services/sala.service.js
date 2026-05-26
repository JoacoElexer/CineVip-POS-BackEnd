const Sala = require('../models/postgres/Sala');

const SalaService = {
  async getAll() { return Sala.getAll(); },
  async getById(id) { const s = await Sala.getById(id); if (!s) throw { status: 404, message: 'Sala no encontrada' }; return s; },
  async create(data) { if (!data.nombre || !data.capacidad) throw { status: 400, message: 'Campos obligatorios: nombre, capacidad' }; return Sala.create(data); },
  async update(id, data) { await this.getById(id); return Sala.update(id, data); },
  async delete(id) { await this.getById(id); return Sala.delete(id); },
};

module.exports = SalaService;
