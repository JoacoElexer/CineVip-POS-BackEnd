const FuncionService = require('../services/funcion.service');

const FuncionController = {
  async getAll(req, res, next) { try { res.json(await FuncionService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await FuncionService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await FuncionService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await FuncionService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await FuncionService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async findBySala(req, res, next) { try { res.json(await FuncionService.findBySala(req.params.salaId)); } catch (err) { next(err); } },
  async findByFecha(req, res, next) { try { res.json(await FuncionService.findByFecha(req.params.fecha)); } catch (err) { next(err); } },
  async findByPelicula(req, res, next) { try { res.json(await FuncionService.findByPelicula(req.params.peliculaId)); } catch (err) { next(err); } },
};

module.exports = FuncionController;
