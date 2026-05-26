const DetalleVentaService = require('../services/detalleVenta.service');

const DetalleVentaController = {
  async getAll(req, res, next) { try { res.json(await DetalleVentaService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await DetalleVentaService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await DetalleVentaService.create(req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await DetalleVentaService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async findByVenta(req, res, next) { try { res.json(await DetalleVentaService.findByVenta(req.params.ventaId)); } catch (err) { next(err); } },
};

module.exports = DetalleVentaController;
