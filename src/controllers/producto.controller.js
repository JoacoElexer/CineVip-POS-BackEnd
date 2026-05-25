const ProductoService = require('../services/producto.service');

const ProductoController = {
  async getAll(req, res, next) {
    try {
      const productos = await ProductoService.getAll();
      res.json(productos);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const producto = await ProductoService.getById(req.params.id);
      res.json(producto);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const producto = await ProductoService.create(req.body);
      res.status(201).json(producto);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const producto = await ProductoService.update(req.params.id, req.body);
      res.json(producto);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await ProductoService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findByCategoria(req, res, next) {
    try {
      const productos = await ProductoService.findByCategoria(req.params.categoriaId);
      res.json(productos);
    } catch (err) { next(err); }
  },
};

module.exports = ProductoController;
