const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const specs = require('../config/swagger');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

router.use('/empleados', require('./empleado.routes'));
router.use('/categorias', require('./categoria.routes'));
router.use('/productos', require('./producto.routes'));
router.use('/promociones', require('./promocion.routes'));
router.use('/salas', require('./sala.routes'));
router.use('/asientos', require('./asiento.routes'));
router.use('/funciones', require('./funcion.routes'));
router.use('/ventas', require('./ventaTotal.routes'));
router.use('/detalle-ventas', require('./detalleVenta.routes'));
router.use('/peliculas', require('./pelicula.routes'));
router.use('/perfiles-usuario', require('./perfilUsuario.routes'));
router.use('/reportes-cierre', require('./reporteCierre.routes'));

module.exports = router;
