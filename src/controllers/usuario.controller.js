const UsuarioService = require('../services/usuario.service');

const UsuarioController = {
  async getAll(req, res, next) {
    try {
      const usuarios = await UsuarioService.getAll();
      res.json(usuarios);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const usuario = await UsuarioService.getById(req.params.id);
      res.json(usuario);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const usuario = await UsuarioService.create(req.body);
      res.status(201).json(usuario);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const usuario = await UsuarioService.update(req.params.id, req.body);
      res.json(usuario);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await UsuarioService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email y password son obligatorios' });
      }
      const usuario = await UsuarioService.login(email, password);
      res.json(usuario);
    } catch (err) { next(err); }
  },
};

module.exports = UsuarioController;
