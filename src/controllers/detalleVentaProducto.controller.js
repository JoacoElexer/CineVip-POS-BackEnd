const DetalleVentaProductoService = require('../services/detalleVentaProducto.service');

const DetalleVentaProductoController = {
  async getAll(req, res, next) {
    try {
      const items = await DetalleVentaProductoService.getAll();
      res.json(items);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const item = await DetalleVentaProductoService.getById(req.params.id);
      res.json(item);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const item = await DetalleVentaProductoService.create(req.body);
      res.status(201).json(item);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await DetalleVentaProductoService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findByVenta(req, res, next) {
    try {
      const items = await DetalleVentaProductoService.findByVenta(req.params.ventaId);
      res.json(items);
    } catch (err) { next(err); }
  },
};

module.exports = DetalleVentaProductoController;
