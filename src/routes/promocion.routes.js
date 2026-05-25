const router = require('express').Router();
const controller = require('../controllers/promocion.controller');

router.get('/', controller.getAll);
router.get('/activas', controller.findActivas);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
