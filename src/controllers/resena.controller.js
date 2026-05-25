const ResenaService = require('../services/resena.service');

const ResenaController = {
  async getAll(req, res, next) {
    try {
      const resenas = await ResenaService.getAll();
      res.json(resenas);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const resena = await ResenaService.getById(req.params.id);
      res.json(resena);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const resena = await ResenaService.create(req.body);
      res.status(201).json(resena);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const resena = await ResenaService.update(req.params.id, req.body);
      res.json(resena);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await ResenaService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findByPelicula(req, res, next) {
    try {
      const resenas = await ResenaService.findByPelicula(req.params.peliculaId);
      res.json(resenas);
    } catch (err) { next(err); }
  },

  async findByUsuario(req, res, next) {
    try {
      const resenas = await ResenaService.findByUsuario(req.params.usuarioId);
      res.json(resenas);
    } catch (err) { next(err); }
  },
};

module.exports = ResenaController;
