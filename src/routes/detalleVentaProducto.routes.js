const router = require('express').Router();
const controller = require('../controllers/detalleVentaProducto.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.get('/venta/:ventaId', controller.findByVenta);

module.exports = router;
