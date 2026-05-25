const Funcion = require('../models/postgres/Funcion');

const FuncionService = {
  async getAll() {
    return Funcion.getAll();
  },

  async getById(id) {
    const funcion = await Funcion.getById(id);
    if (!funcion) throw { status: 404, message: 'Función no encontrada' };
    return funcion;
  },

  async create(data) {
    const { pelicula_id, sala_id, fecha, hora_inicio, precio_base } = data;
    if (!pelicula_id || !sala_id || !fecha || !hora_inicio || precio_base === undefined) {
      throw { status: 400, message: 'Campos obligatorios: pelicula_id, sala_id, fecha, hora_inicio, precio_base' };
    }
    return Funcion.create(data);
  },

  async update(id, data) {
    await this.getById(id);
    return Funcion.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Funcion.delete(id);
  },

  async findBySala(salaId) {
    return Funcion.findBySala(salaId);
  },

  async findByFecha(fecha) {
    return Funcion.findByFecha(fecha);
  },

  async findByPelicula(peliculaId) {
    return Funcion.findByPelicula(peliculaId);
  },
};

module.exports = FuncionService;
