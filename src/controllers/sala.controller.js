const SalaService = require('../services/sala.service');

const SalaController = {
  async getAll(req, res, next) { try { res.json(await SalaService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await SalaService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await SalaService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await SalaService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await SalaService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
};

module.exports = SalaController;
