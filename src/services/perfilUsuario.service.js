const PerfilUsuario = require('../models/mongo/PerfilUsuario');

const PerfilUsuarioService = {
  async getAll() { return PerfilUsuario.find().sort({ createdAt: -1 }); },
  async getById(id) { const p = await PerfilUsuario.findById(id); if (!p) throw { status: 404, message: 'Perfil no encontrado' }; return p; },
  async create(data) { if (!data.nombre_completo) throw { status: 400, message: 'nombre_completo es obligatorio' }; return PerfilUsuario.create(data); },
  async update(id, data) { const p = await PerfilUsuario.findByIdAndUpdate(id, data, { new: true, runValidators: true }); if (!p) throw { status: 404, message: 'Perfil no encontrado' }; return p; },
  async delete(id) { const p = await PerfilUsuario.findByIdAndDelete(id); if (!p) throw { status: 404, message: 'Perfil no encontrado' }; return p; },
  async agregarPuntos(id, puntos) {
    const p = await PerfilUsuario.findById(id); if (!p) throw { status: 404, message: 'Perfil no encontrado' };
    p.puntos_acumulados += puntos;
    return p.save();
  },
};

module.exports = PerfilUsuarioService;
