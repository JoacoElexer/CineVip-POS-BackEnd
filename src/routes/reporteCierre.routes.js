/**
 * @swagger
 * /reportes-cierre:
 *   get:
 *     summary: Obtiene todos los reportes de cierre
 *     tags: [Reportes Cierre]
 *     responses:
 *       200:
 *         description: Lista de reportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReporteCierre'
 *   post:
 *     summary: Crea un nuevo reporte de cierre
 *     tags: [Reportes Cierre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReporteCierreInput'
 *     responses:
 *       201:
 *         description: Reporte creado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /reportes-cierre/{id}:
 *   get:
 *     summary: Obtiene un reporte por ID (ObjectId de MongoDB)
 *     tags: [Reportes Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualiza un reporte de cierre
 *     tags: [Reportes Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReporteCierreInput'
 *     responses:
 *       200:
 *         description: Reporte actualizado
 *   delete:
 *     summary: Elimina un reporte de cierre
 *     tags: [Reportes Cierre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 */

/**
 * @swagger
 * /reportes-cierre/fecha/{fecha}:
 *   get:
 *     summary: Obtiene reportes por fecha
 *     tags: [Reportes Cierre]
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
 *         description: Reportes en la fecha
 */

const router = require('express').Router();
const controller = require('../controllers/reporteCierre.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/fecha/:fecha', controller.findByFecha);

module.exports = router;
