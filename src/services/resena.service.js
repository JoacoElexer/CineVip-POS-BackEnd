const Resena = require('../models/mongo/Resena');

const ResenaService = {
  async getAll() {
    return Resena.find().populate('pelicula_id', 'titulo').populate('usuario_id', 'nombres').sort({ createdAt: -1 });
  },

  async getById(id) {
    const resena = await Resena.findById(id).populate('pelicula_id', 'titulo').populate('usuario_id', 'nombres');
    if (!resena) throw { status: 404, message: 'Reseña no encontrada' };
    return resena;
  },

  async create(data) {
    const { pelicula_id, usuario_id, calificacion } = data;
    if (!pelicula_id || !usuario_id || !calificacion) {
      throw { status: 400, message: 'Campos obligatorios: pelicula_id, usuario_id, calificacion' };
    }
    return Resena.create(data);
  },

  async update(id, data) {
    const resena = await Resena.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!resena) throw { status: 404, message: 'Reseña no encontrada' };
    return resena;
  },

  async delete(id) {
    const resena = await Resena.findByIdAndDelete(id);
    if (!resena) throw { status: 404, message: 'Reseña no encontrada' };
    return resena;
  },

  async findByPelicula(peliculaId) {
    return Resena.find({ pelicula_id: peliculaId }).populate('usuario_id', 'nombres').sort({ createdAt: -1 });
  },

  async findByUsuario(usuarioId) {
    return Resena.find({ usuario_id: usuarioId }).populate('pelicula_id', 'titulo').sort({ createdAt: -1 });
  },
};

module.exports = ResenaService;
