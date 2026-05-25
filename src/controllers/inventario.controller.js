const InventarioService = require('../services/inventario.service');

const InventarioController = {
  async getAll(req, res, next) {
    try {
      const items = await InventarioService.getAll();
      res.json(items);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const item = await InventarioService.getById(req.params.id);
      res.json(item);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const item = await InventarioService.create(req.body);
      res.status(201).json(item);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const item = await InventarioService.update(req.params.id, req.body);
      res.json(item);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await InventarioService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async getByProducto(req, res, next) {
    try {
      const item = await InventarioService.getByProducto(req.params.productoId);
      res.json(item);
    } catch (err) { next(err); }
  },

  async ajustarStock(req, res, next) {
    try {
      const { cantidad } = req.body;
      if (cantidad === undefined) {
        return res.status(400).json({ message: 'cantidad es obligatorio' });
      }
      const item = await InventarioService.ajustarStock(req.params.productoId, parseInt(cantidad, 10));
      res.json(item);
    } catch (err) { next(err); }
  },
};

module.exports = InventarioController;
