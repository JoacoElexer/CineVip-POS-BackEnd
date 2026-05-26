const PromocionService = require('../services/promocion.service');

const PromocionController = {
  async getAll(req, res, next) { try { res.json(await PromocionService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await PromocionService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await PromocionService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await PromocionService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await PromocionService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async findActivas(req, res, next) { try { res.json(await PromocionService.findActivas()); } catch (err) { next(err); } },
};

module.exports = PromocionController;
