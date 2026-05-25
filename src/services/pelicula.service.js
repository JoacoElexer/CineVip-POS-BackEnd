const Pelicula = require('../models/mongo/Pelicula');

const PeliculaService = {
  async getAll() {
    return Pelicula.find().sort({ createdAt: -1 });
  },

  async getById(id) {
    const pelicula = await Pelicula.findById(id);
    if (!pelicula) throw { status: 404, message: 'Película no encontrada' };
    return pelicula;
  },

  async create(data) {
    return Pelicula.create(data);
  },

  async update(id, data) {
    const pelicula = await Pelicula.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!pelicula) throw { status: 404, message: 'Película no encontrada' };
    return pelicula;
  },

  async delete(id) {
    const pelicula = await Pelicula.findByIdAndDelete(id);
    if (!pelicula) throw { status: 404, message: 'Película no encontrada' };
    return pelicula;
  },

  async buscar(termino) {
    return Pelicula.find({ $text: { $search: termino } });
  },
};

module.exports = PeliculaService;
