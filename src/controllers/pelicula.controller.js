const PeliculaService = require('../services/pelicula.service');

const PeliculaController = {
  async getAll(req, res, next) { try { res.json(await PeliculaService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await PeliculaService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await PeliculaService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await PeliculaService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await PeliculaService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async buscar(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) return res.status(400).json({ message: 'Parámetro q requerido' });
      res.json(await PeliculaService.buscar(q));
    } catch (err) { next(err); }
  },
};

module.exports = PeliculaController;
