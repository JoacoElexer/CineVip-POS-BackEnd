const MetodoPagoService = require('../services/metodoPago.service');

const MetodoPagoController = {
  async getAll(req, res, next) {
    try {
      const items = await MetodoPagoService.getAll();
      res.json(items);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const item = await MetodoPagoService.getById(req.params.id);
      res.json(item);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const item = await MetodoPagoService.create(req.body);
      res.status(201).json(item);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await MetodoPagoService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findByVenta(req, res, next) {
    try {
      const items = await MetodoPagoService.findByVenta(req.params.ventaId);
      res.json(items);
    } catch (err) { next(err); }
  },
};

module.exports = MetodoPagoController;
