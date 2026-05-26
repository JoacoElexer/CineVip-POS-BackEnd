const EmpleadoService = require('../services/empleado.service');

const EmpleadoController = {
  async getAll(req, res, next) { try { res.json(await EmpleadoService.getAll()); } catch (err) { next(err); } },
  async getById(req, res, next) { try { res.json(await EmpleadoService.getById(req.params.id)); } catch (err) { next(err); } },
  async create(req, res, next) { try { res.status(201).json(await EmpleadoService.create(req.body)); } catch (err) { next(err); } },
  async update(req, res, next) { try { res.json(await EmpleadoService.update(req.params.id, req.body)); } catch (err) { next(err); } },
  async delete(req, res, next) { try { await EmpleadoService.delete(req.params.id); res.status(204).end(); } catch (err) { next(err); } },
  async login(req, res, next) {
    try {
      const { usuario, password } = req.body;
      if (!usuario || !password) return res.status(400).json({ message: 'usuario y password son obligatorios' });
      res.json(await EmpleadoService.login(usuario, password));
    } catch (err) { next(err); }
  },
};

module.exports = EmpleadoController;
