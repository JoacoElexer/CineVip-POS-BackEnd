const AsientoService = require('../services/asiento.service');

const AsientoController = {
  async getAll(req, res, next) {
    try {
      const asientos = await AsientoService.getAll();
      res.json(asientos);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const asiento = await AsientoService.getById(req.params.id);
      res.json(asiento);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const asiento = await AsientoService.create(req.body);
      res.status(201).json(asiento);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const asiento = await AsientoService.update(req.params.id, req.body);
      res.json(asiento);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await AsientoService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findBySala(req, res, next) {
    try {
      const asientos = await AsientoService.findBySala(req.params.salaId);
      res.json(asientos);
    } catch (err) { next(err); }
  },

  async actualizarEstado(req, res, next) {
    try {
      const asiento = await AsientoService.actualizarEstado(req.params.id, req.body.estado);
      res.json(asiento);
    } catch (err) { next(err); }
  },
};

module.exports = AsientoController;
