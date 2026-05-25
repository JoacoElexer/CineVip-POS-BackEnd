const router = require('express').Router();
const controller = require('../controllers/perfilUsuario.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/puntos', controller.agregarPuntos);
router.post('/:id/historial', controller.agregarHistorial);

module.exports = router;
