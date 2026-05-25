const FuncionService = require('../services/funcion.service');

const FuncionController = {
  async getAll(req, res, next) {
    try {
      const funciones = await FuncionService.getAll();
      res.json(funciones);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const funcion = await FuncionService.getById(req.params.id);
      res.json(funcion);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const funcion = await FuncionService.create(req.body);
      res.status(201).json(funcion);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const funcion = await FuncionService.update(req.params.id, req.body);
      res.json(funcion);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await FuncionService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async findBySala(req, res, next) {
    try {
      const funciones = await FuncionService.findBySala(req.params.salaId);
      res.json(funciones);
    } catch (err) { next(err); }
  },

  async findByFecha(req, res, next) {
    try {
      const funciones = await FuncionService.findByFecha(req.params.fecha);
      res.json(funciones);
    } catch (err) { next(err); }
  },

  async findByPelicula(req, res, next) {
    try {
      const funciones = await FuncionService.findByPelicula(req.params.peliculaId);
      res.json(funciones);
    } catch (err) { next(err); }
  },
};

module.exports = FuncionController;
