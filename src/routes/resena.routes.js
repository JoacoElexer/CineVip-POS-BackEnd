const router = require('express').Router();
const controller = require('../controllers/resena.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/pelicula/:peliculaId', controller.findByPelicula);
router.get('/usuario/:usuarioId', controller.findByUsuario);

module.exports = router;
