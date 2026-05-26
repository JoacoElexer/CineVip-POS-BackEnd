const PerfilUsuarioService = require('../services/perfilUsuario.service');

const PerfilUsuarioController = {
  async getAll(req, res, next) { try { res.json(await PerfilUsuarioService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await PerfilUsuarioService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await PerfilUsuarioService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await PerfilUsuarioService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await PerfilUsuarioService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async agregarPuntos(req, res, next) {
    try {
      const { puntos } = req.body;
      if (puntos === undefined) return res.status(400).json({ message: 'puntos es obligatorio' });
      res.json(await PerfilUsuarioService.agregarPuntos(req.params.id, puntos));
    } catch (err) { next(err); }
  },
};

module.exports = PerfilUsuarioController;
