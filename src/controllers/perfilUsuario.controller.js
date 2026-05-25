const PerfilUsuarioService = require('../services/perfilUsuario.service');

const PerfilUsuarioController = {
  async getAll(req, res, next) {
    try {
      const perfiles = await PerfilUsuarioService.getAll();
      res.json(perfiles);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const perfil = await PerfilUsuarioService.getById(req.params.id);
      res.json(perfil);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const perfil = await PerfilUsuarioService.create(req.body);
      res.status(201).json(perfil);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const perfil = await PerfilUsuarioService.update(req.params.id, req.body);
      res.json(perfil);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await PerfilUsuarioService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async agregarPuntos(req, res, next) {
    try {
      const { puntos } = req.body;
      if (puntos === undefined) return res.status(400).json({ message: 'puntos es obligatorio' });
      const perfil = await PerfilUsuarioService.agregarPuntos(req.params.id, puntos);
      res.json(perfil);
    } catch (err) { next(err); }
  },

  async agregarHistorial(req, res, next) {
    try {
      const { pelicula_id } = req.body;
      if (!pelicula_id) return res.status(400).json({ message: 'pelicula_id es obligatorio' });
      const perfil = await PerfilUsuarioService.agregarHistorial(req.params.id, pelicula_id);
      res.json(perfil);
    } catch (err) { next(err); }
  },
};

module.exports = PerfilUsuarioController;
