const router = require('express').Router();
const controller = require('../controllers/venta.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/usuario/:usuarioId', controller.findByUsuario);
router.get('/fecha/:fecha', controller.findByFecha);

module.exports = router;
