const router = require('express').Router();
const controller = require('../controllers/producto.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/categoria/:categoriaId', controller.findByCategoria);

module.exports = router;
