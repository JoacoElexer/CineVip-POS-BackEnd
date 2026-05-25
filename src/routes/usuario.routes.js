const router = require('express').Router();
const controller = require('../controllers/usuario.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/login', controller.login);

module.exports = router;
