/**
 * @swagger
 * /promociones:
 *   get:
 *     summary: Obtiene todas las promociones
 *     tags: [Promociones]
 *     responses:
 *       200:
 *         description: Lista de promociones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promocion'
 *   post:
 *     summary: Crea una nueva promoción
 *     tags: [Promociones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PromocionInput'
 *     responses:
 *       201:
 *         description: Promoción creada
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /promociones/{id}:
 *   get:
 *     summary: Obtiene una promoción por ID
 *     tags: [Promociones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Promoción encontrada
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualiza una promoción
 *     tags: [Promociones]
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
 *             $ref: '#/components/schemas/PromocionInput'
 *     responses:
 *       200:
 *         description: Promoción actualizada
 *   delete:
 *     summary: Elimina una promoción
 *     tags: [Promociones]
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
 * /promociones/activas:
 *   get:
 *     summary: Obtiene promociones activas
 *     tags: [Promociones]
 *     responses:
 *       200:
 *         description: Promociones activas
 */

const router = require('express').Router();
const controller = require('../controllers/promocion.controller');

router.get('/', controller.getAll);
router.get('/activas', controller.findActivas);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
