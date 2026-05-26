/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtiene todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VentaTotal'
 *   post:
 *     summary: Crea una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VentaTotalInput'
 *     responses:
 *       201:
 *         description: Venta creada
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /ventas/{id}:
 *   get:
 *     summary: Obtiene una venta con sus detalles
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada (incluye array de detalles)
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualiza una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VentaTotalInput'
 *     responses:
 *       200:
 *         description: Venta actualizada
 *   delete:
 *     summary: Elimina una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminada correctamente
 */

/**
 * @swagger
 * /ventas/empleado/{empleadoId}:
 *   get:
 *     summary: Obtiene ventas por empleado
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: empleadoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ventas del empleado
 */

/**
 * @swagger
 * /ventas/fecha/{fecha}:
 *   get:
 *     summary: Obtiene ventas por fecha
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: "2026-05-25"
 *     responses:
 *       200:
 *         description: Ventas en la fecha
 */

const router = require('express').Router();
const controller = require('../controllers/ventaTotal.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/empleado/:empleadoId', controller.findByEmpleado);
router.get('/fecha/:fecha', controller.findByFecha);

module.exports = router;
