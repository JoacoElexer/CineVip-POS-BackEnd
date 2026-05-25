const VentaService = require('../services/venta.service');

const VentaController = {
  async getAll(req, res, next) {
    try {
      const ventas = await VentaService.getAll();
      res.json(ventas);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const venta = await VentaService.getById(req.params.id);
      res.json(venta);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const venta = await VentaService.create(req.body);
      res.status(201).json(venta);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const venta = await VentaService.update(req.params.id, req.body);
      res.json(venta);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await VentaService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findByUsuario(req, res, next) {
    try {
      const ventas = await VentaService.findByUsuario(req.params.usuarioId);
      res.json(ventas);
    } catch (err) { next(err); }
  },

  async findByFecha(req, res, next) {
    try {
      const ventas = await VentaService.findByFecha(req.params.fecha);
      res.json(ventas);
    } catch (err) { next(err); }
  },
};

module.exports = VentaController;
