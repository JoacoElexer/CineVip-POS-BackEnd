const Promocion = require('../models/postgres/Promocion');

const PromocionService = {
  async getAll() { return Promocion.getAll(); },
  async getById(id) { const p = await Promocion.getById(id); if (!p) throw { status: 404, message: 'Promoción no encontrada' }; return p; },
  async create(data) { if (!data.nombre || data.precio_combo === undefined) throw { status: 400, message: 'Campos obligatorios: nombre, precio_combo' }; return Promocion.create(data); },
  async update(id, data) { await this.getById(id); return Promocion.update(id, data); },
  async delete(id) { await this.getById(id); return Promocion.delete(id); },
  async findActivas() { return Promocion.findActivas(); },
};

module.exports = PromocionService;
