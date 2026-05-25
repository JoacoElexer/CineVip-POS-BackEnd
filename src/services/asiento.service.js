const Asiento = require('../models/postgres/Asiento');

const AsientoService = {
  async getAll() {
    return Asiento.getAll();
  },

  async getById(id) {
    const asiento = await Asiento.getById(id);
    if (!asiento) throw { status: 404, message: 'Asiento no encontrado' };
    return asiento;
  },

  async create(data) {
    const { sala_id, fila, numero } = data;
    if (!sala_id || !fila || !numero) {
      throw { status: 400, message: 'Campos obligatorios: sala_id, fila, numero' };
    }
    return Asiento.create(data);
  },

  async update(id, data) {
    await this.getById(id);
    return Asiento.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Asiento.delete(id);
  },

  async findBySala(salaId) {
    return Asiento.findBySala(salaId);
  },

  async actualizarEstado(id, estado) {
    await this.getById(id);
    return Asiento.actualizarEstado(id, estado);
  },
};

module.exports = AsientoService;
