const PromocionService = require('../services/promocion.service');

const PromocionController = {
  async getAll(req, res, next) {
    try {
      const promociones = await PromocionService.getAll();
      res.json(promociones);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const promocion = await PromocionService.getById(req.params.id);
      res.json(promocion);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const promocion = await PromocionService.create(req.body);
      res.status(201).json(promocion);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const promocion = await PromocionService.update(req.params.id, req.body);
      res.json(promocion);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await PromocionService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findActivas(req, res, next) {
    try {
      const promociones = await PromocionService.findActivas();
      res.json(promociones);
    } catch (err) { next(err); }
  },
};

module.exports = PromocionController;
