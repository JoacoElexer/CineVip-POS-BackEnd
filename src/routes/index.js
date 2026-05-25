const router = require('express').Router();

router.use('/usuarios', require('./usuario.routes'));
router.use('/salas', require('./sala.routes'));
router.use('/asientos', require('./asiento.routes'));
router.use('/funciones', require('./funcion.routes'));
router.use('/categorias', require('./categoria.routes'));
router.use('/productos', require('./producto.routes'));
router.use('/inventario', require('./inventario.routes'));
router.use('/ventas', require('./venta.routes'));
router.use('/detalle-venta-boletos', require('./detalleVentaBoleto.routes'));
router.use('/detalle-venta-productos', require('./detalleVentaProducto.routes'));
router.use('/metodos-pago', require('./metodoPago.routes'));
router.use('/promociones', require('./promocion.routes'));
router.use('/peliculas', require('./pelicula.routes'));
router.use('/resenas', require('./resena.routes'));
router.use('/perfiles-usuario', require('./perfilUsuario.routes'));

module.exports = router;
