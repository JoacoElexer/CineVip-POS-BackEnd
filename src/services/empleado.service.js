const Empleado = require('../models/postgres/Empleado');

const EmpleadoService = {
  async getAll() { return Empleado.getAll(); },
  async getById(id) { const e = await Empleado.getById(id); if (!e) throw { status: 404, message: 'Empleado no encontrado' }; return e; },
  async create(data) {
    if (!data.nombre || !data.usuario || !data.password || !data.rol) throw { status: 400, message: 'Campos obligatorios: nombre, usuario, password, rol' };
    const existente = await Empleado.findByUsuario(data.usuario);
    if (existente) throw { status: 409, message: 'El usuario ya existe' };
    return Empleado.create(data);
  },
  async update(id, data) { await this.getById(id); return Empleado.update(id, data); },
  async delete(id) { await this.getById(id); return Empleado.delete(id); },
  async login(usuario, password) {
    const emp = await Empleado.findByUsuario(usuario);
    if (!emp || !(await Empleado.comparePassword(password, emp.password))) throw { status: 401, message: 'Credenciales inválidas' };
    const { password: _, ...rest } = emp;
    return rest;
  },
};

module.exports = EmpleadoService;
