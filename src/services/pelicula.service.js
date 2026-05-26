const Pelicula = require('../models/mongo/Pelicula');

const PeliculaService = {
  async getAll() { return Pelicula.find().sort({ createdAt: -1 }); },
  async getById(id) { const p = await Pelicula.findById(id); if (!p) throw { status: 404, message: 'Película no encontrada' }; return p; },
  async create(data) { return Pelicula.create(data); },
  async update(id, data) { const p = await Pelicula.findByIdAndUpdate(id, data, { new: true, runValidators: true }); if (!p) throw { status: 404, message: 'Película no encontrada' }; return p; },
  async delete(id) { const p = await Pelicula.findByIdAndDelete(id); if (!p) throw { status: 404, message: 'Película no encontrada' }; return p; },
  async buscar(termino) { return Pelicula.find({ $text: { $search: termino } }); },
};

module.exports = PeliculaService;
