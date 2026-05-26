/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       allOf:
 *         - $ref: '#/components/schemas/Empleado'
 *     EmpleadoInput:
 *       allOf:
 *         - $ref: '#/components/schemas/EmpleadoInput'
 *     LoginInput:
 *       allOf:
 *         - $ref: '#/components/schemas/LoginInput'
 */

/**
 * @swagger
 * /empleados/login:
 *   post:
 *     summary: Inicia sesión de empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpleadoInput'
 *     responses:
 *       201:
 *         description: Empleado creado
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El usuario ya existe
 */

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: No encontrado
 *   put:
 *     summary: Actualiza un empleado
 *     tags: [Empleados]
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
 *             $ref: '#/components/schemas/EmpleadoInput'
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *   delete:
 *     summary: Elimina un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 *       404:
 *         description: No encontrado
 */

const router = require('express').Router();
const controller = require('../controllers/empleado.controller');

router.post('/login', controller.login);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
