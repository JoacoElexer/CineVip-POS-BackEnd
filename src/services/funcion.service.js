const Funcion = require('../models/postgres/Funcion');

const FuncionService = {
  async getAll() { return Funcion.getAll(); },
  async getById(id) { const f = await Funcion.getById(id); if (!f) throw { status: 404, message: 'Función no encontrada' }; return f; },
  async create(data) { if (!data.pelicula_id || !data.sala_id || !data.fecha || !data.hora || data.precio_boleto === undefined) throw { status: 400, message: 'Campos obligatorios: pelicula_id, sala_id, fecha, hora, precio_boleto' }; return Funcion.create(data); },
  async update(id, data) { await this.getById(id); return Funcion.update(id, data); },
  async delete(id) { await this.getById(id); return Funcion.delete(id); },
  async findBySala(salaId) { return Funcion.findBySala(salaId); },
  async findByFecha(fecha) { return Funcion.findByFecha(fecha); },
  async findByPelicula(peliculaId) { return Funcion.findByPelicula(peliculaId); },
};

module.exports = FuncionService;
