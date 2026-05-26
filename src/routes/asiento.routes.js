/**
 * @swagger
 * /asientos:
 *   get:
 *     summary: Obtiene todos los asientos
 *     tags: [Asientos]
 *     responses:
 *       200:
 *         description: Lista de asientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asiento'
 *   post:
 *     summary: Crea un nuevo asiento
 *     tags: [Asientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AsientoInput'
 *     responses:
 *       201:
 *         description: Asiento creado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /asientos/{id}:
 *   get:
 *     summary: Obtiene un asiento por ID
 *     tags: [Asientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asiento encontrado
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualiza un asiento
 *     tags: [Asientos]
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
 *             $ref: '#/components/schemas/AsientoInput'
 *     responses:
 *       200:
 *         description: Asiento actualizado
 *   delete:
 *     summary: Elimina un asiento
 *     tags: [Asientos]
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
 * /asientos/{id}/estado:
 *   patch:
 *     summary: Actualiza el estado de un asiento
 *     tags: [Asientos]
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
 *             $ref: '#/components/schemas/EstadoInput'
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: Asiento no encontrado
 */

/**
 * @swagger
 * /asientos/sala/{salaId}:
 *   get:
 *     summary: Obtiene asientos por sala
 *     tags: [Asientos]
 *     parameters:
 *       - in: path
 *         name: salaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asientos de la sala
 */

const router = require('express').Router();
const controller = require('../controllers/asiento.controller');

router.get('/', controller.getAll);
router.get('/sala/:salaId', controller.findBySala);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.patch('/:id/estado', controller.actualizarEstado);

module.exports = router;
