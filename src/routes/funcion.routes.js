const router = require('express').Router();
const controller = require('../controllers/funcion.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/sala/:salaId', controller.findBySala);
router.get('/fecha/:fecha', controller.findByFecha);
router.get('/pelicula/:peliculaId', controller.findByPelicula);

module.exports = router;
