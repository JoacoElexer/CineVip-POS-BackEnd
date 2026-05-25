const router = require('express').Router();
const controller = require('../controllers/inventario.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/producto/:productoId', controller.getByProducto);
router.patch('/producto/:productoId/stock', controller.ajustarStock);

module.exports = router;
