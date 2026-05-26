const ReporteCierreService = require('../services/reporteCierre.service');

const ReporteCierreController = {
  async getAll(req, res, next) { try { res.json(await ReporteCierreService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await ReporteCierreService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await ReporteCierreService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await ReporteCierreService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await ReporteCierreService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async findByFecha(req, res, next) { try { res.json(await ReporteCierreService.findByFecha(req.params.fecha)); } catch (err) { next(err); } },
};

module.exports = ReporteCierreController;
