const PerfilUsuario = require('../models/mongo/PerfilUsuario');

const PerfilUsuarioService = {
  async getAll() {
    return PerfilUsuario.find().sort({ createdAt: -1 });
  },

  async getById(id) {
    const perfil = await PerfilUsuario.findById(id);
    if (!perfil) throw { status: 404, message: 'Perfil de usuario no encontrado' };
    return perfil;
  },

  async create(data) {
    const { nombres, email } = data;
    if (!nombres || !email) {
      throw { status: 400, message: 'Campos obligatorios: nombres, email' };
    }
    const existente = await PerfilUsuario.findOne({ email });
    if (existente) throw { status: 409, message: 'El email ya está registrado' };
    return PerfilUsuario.create(data);
  },

  async update(id, data) {
    const perfil = await PerfilUsuario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!perfil) throw { status: 404, message: 'Perfil de usuario no encontrado' };
    return perfil;
  },

  async delete(id) {
    const perfil = await PerfilUsuario.findByIdAndDelete(id);
    if (!perfil) throw { status: 404, message: 'Perfil de usuario no encontrado' };
    return perfil;
  },

  async agregarPuntos(id, puntos) {
    const perfil = await PerfilUsuario.findById(id);
    if (!perfil) throw { status: 404, message: 'Perfil de usuario no encontrado' };
    perfil.membresia.puntos += puntos;
    return perfil.save();
  },

  async agregarHistorial(id, peliculaId) {
    const perfil = await PerfilUsuario.findById(id);
    if (!perfil) throw { status: 404, message: 'Perfil de usuario no encontrado' };
    perfil.historial_peliculas.push({ pelicula_id: peliculaId, fecha_vista: new Date() });
    return perfil.save();
  },
};

module.exports = PerfilUsuarioService;
