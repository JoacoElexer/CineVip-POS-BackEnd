/**
 * @swagger
 * /peliculas:
 *   get:
 *     summary: Obtiene todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 *   post:
 *     summary: Crea una nueva película
 *     tags: [Películas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PeliculaInput'
 *     responses:
 *       201:
 *         description: Película creada
 */

/**
 * @swagger
 * /peliculas/{id}:
 *   get:
 *     summary: Obtiene una película por ID (ObjectId de MongoDB)
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de MongoDB
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: No encontrada
 *   put:
 *     summary: Actualiza una película
 *     tags: [Películas]
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
 *             $ref: '#/components/schemas/PeliculaInput'
 *     responses:
 *       200:
 *         description: Película actualizada
 *   delete:
 *     summary: Elimina una película
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminada correctamente
 */

/**
 * @swagger
 * /peliculas/buscar:
 *   get:
 *     summary: Busca películas por texto
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *       400:
 *         description: Parámetro q requerido
 */

const router = require('express').Router();
const controller = require('../controllers/pelicula.controller');

router.get('/', controller.getAll);
router.get('/buscar', controller.buscar);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
