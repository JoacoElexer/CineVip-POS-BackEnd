const Usuario = require('../models/postgres/Usuario');

const UsuarioService = {
  async getAll() {
    return Usuario.getAll();
  },

  async getById(id) {
    const usuario = await Usuario.getById(id);
    if (!usuario) throw { status: 404, message: 'Usuario no encontrado' };
    return usuario;
  },

  async create(data) {
    const { nombre, email, password, rol } = data;
    if (!nombre || !email || !password || !rol) {
      throw { status: 400, message: 'Todos los campos obligatorios: nombre, email, password, rol' };
    }
    const existente = await Usuario.findByEmail(email);
    if (existente) throw { status: 409, message: 'El email ya está registrado' };
    return Usuario.create({ nombre, email, password, rol });
  },

  async update(id, data) {
    await this.getById(id);
    return Usuario.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Usuario.delete(id);
  },

  async login(email, password) {
    const usuario = await Usuario.findByEmail(email);
    if (!usuario) throw { status: 401, message: 'Credenciales inválidas' };
    const valido = await Usuario.comparePassword(password, usuario.password);
    if (!valido) throw { status: 401, message: 'Credenciales inválidas' };
    const { password: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
  },
};

module.exports = UsuarioService;
