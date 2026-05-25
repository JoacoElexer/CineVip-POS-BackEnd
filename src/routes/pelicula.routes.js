const router = require('express').Router();
const controller = require('../controllers/pelicula.controller');

router.get('/', controller.getAll);
router.get('/buscar', controller.buscar);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
