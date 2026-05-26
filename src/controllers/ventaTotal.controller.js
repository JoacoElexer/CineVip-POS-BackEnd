const VentaTotalService = require('../services/ventaTotal.service');

const VentaTotalController = {
  async getAll(req, res, next) { try { res.json(await VentaTotalService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await VentaTotalService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await VentaTotalService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await VentaTotalService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await VentaTotalService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async findByEmpleado(req, res, next) { try { res.json(await VentaTotalService.findByEmpleado(req.params.empleadoId)); } catch (err) { next(err); } },
  async findByFecha(req, res, next) { try { res.json(await VentaTotalService.findByFecha(req.params.fecha)); } catch (err) { next(err); } },
};

module.exports = VentaTotalController;
