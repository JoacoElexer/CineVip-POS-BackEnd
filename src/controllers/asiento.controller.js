const AsientoService = require('../services/asiento.service');

const AsientoController = {
  async getAll(req, res, next) { try { res.json(await AsientoService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await AsientoService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await AsientoService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await AsientoService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await AsientoService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async findBySala(req, res, next) { try { res.json(await AsientoService.findBySala(req.params.salaId)); } catch (err) { next(err); } },
  async actualizarEstado(req, res, next) { try { const { estado } = req.body; if (!estado) return res.status(400).json({ message: 'estado es obligatorio' }); res.json(await AsientoService.actualizarEstado(req.params.id, estado)); } catch (err) { next(err); } },
};

module.exports = AsientoController;
