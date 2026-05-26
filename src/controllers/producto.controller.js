const ProductoService = require('../services/producto.service');

const ProductoController = {
  async getAll(req, res, next) { try { res.json(await ProductoService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await ProductoService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await ProductoService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await ProductoService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await ProductoService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async ajustarStock(req, res, next) {
    try {
      const { cantidad } = req.body;
      if (cantidad === undefined) return res.status(400).json({ message: 'cantidad es obligatorio' });
      res.json(await ProductoService.ajustarStock(req.params.id, parseInt(cantidad, 10)));
    } catch (err) { next(err); }
  },
  async findByCategoria(req, res, next) { try { res.json(await ProductoService.findByCategoria(req.params.categoriaId)); } catch (err) { next(err); } },
};

module.exports = ProductoController;
