const SalaService = require('../services/sala.service');

const SalaController = {
  async getAll(req, res, next) {
    try {
      const salas = await SalaService.getAll();
      res.json(salas);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const sala = await SalaService.getById(req.params.id);
      res.json(sala);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const sala = await SalaService.create(req.body);
      res.status(201).json(sala);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const sala = await SalaService.update(req.params.id, req.body);
      res.json(sala);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await SalaService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },
};

module.exports = SalaController;
