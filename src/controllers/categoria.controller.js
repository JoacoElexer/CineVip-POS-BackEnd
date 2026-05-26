const CategoriaService = require('../services/categoria.service');

const CategoriaController = {
  async getAll(req, res, next) { try { res.json(await CategoriaService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await CategoriaService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await CategoriaService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await CategoriaService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await CategoriaService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
};

module.exports = CategoriaController;
