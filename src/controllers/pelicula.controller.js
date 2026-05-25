const PeliculaService = require('../services/pelicula.service');

const PeliculaController = {
  async getAll(req, res, next) {
    try {
      const peliculas = await PeliculaService.getAll();
      res.json(peliculas);
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const pelicula = await PeliculaService.getById(req.params.id);
      res.json(pelicula);
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const pelicula = await PeliculaService.create(req.body);
      res.status(201).json(pelicula);
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const pelicula = await PeliculaService.update(req.params.id, req.body);
      res.json(pelicula);
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      await PeliculaService.delete(req.params.id);
      res.status(204).end();
    } catch (err) { next(err); }
  },

  async buscar(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) return res.status(400).json({ message: 'Parámetro de búsqueda q requerido' });
      const peliculas = await PeliculaService.buscar(q);
      res.json(peliculas);
    } catch (err) { next(err); }
  },
};

module.exports = PeliculaController;
