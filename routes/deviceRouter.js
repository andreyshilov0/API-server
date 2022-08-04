const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create); // Метод регистрации устройства
router.get('/', deviceController.getAll); // Метод получения устройств
router.get('/:id', deviceController.getOne); // Метод получения устройств по Id

module.exports = router;
