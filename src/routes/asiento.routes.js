const router = require('express').Router();
const controller = require('../controllers/asiento.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/sala/:salaId', controller.findBySala);
router.patch('/:id/estado', controller.actualizarEstado);

module.exports = router;
