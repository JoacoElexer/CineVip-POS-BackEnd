const DetalleVentaBoletoService = require('../services/detalleVentaBoleto.service');

const DetalleVentaBoletoController = {
  async getAll(req, res, next) {
    try {
      const items = await DetalleVentaBoletoService.getAll();
      res.json(items);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const item = await DetalleVentaBoletoService.getById(req.params.id);
      res.json(item);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const item = await DetalleVentaBoletoService.create(req.body);
      res.status(201).json(item);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await DetalleVentaBoletoService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findByVenta(req, res, next) {
    try {
      const items = await DetalleVentaBoletoService.findByVenta(req.params.ventaId);
      res.json(items);
    } catch (err) { next(err); }
  },
};

module.exports = DetalleVentaBoletoController;
