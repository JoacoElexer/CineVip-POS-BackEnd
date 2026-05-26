/**
 * @swagger
 * /detalle-ventas:
 *   get:
 *     summary: Obtiene todos los detalles de ventas
 *     tags: [Detalle Ventas]
 *     responses:
 *       200:
 *         description: Lista de detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleVenta'
 *   post:
 *     summary: Crea un nuevo detalle de venta
 *     tags: [Detalle Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleVentaInput'
 *     responses:
 *       201:
 *         description: Detalle creado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /detalle-ventas/{id}:
 *   get:
 *     summary: Obtiene un detalle por ID
 *     tags: [Detalle Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *       404:
 *         description: No encontrado
 *   delete:
 *     summary: Elimina un detalle
 *     tags: [Detalle Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 */

/**
 * @swagger
 * /detalle-ventas/venta/{ventaId}:
 *   get:
 *     summary: Obtiene detalles por venta
 *     tags: [Detalle Ventas]
 *     parameters:
 *       - in: path
 *         name: ventaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la venta
 */

const router = require('express').Router();
const controller = require('../controllers/detalleVenta.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.get('/venta/:ventaId', controller.findByVenta);

module.exports = router;
