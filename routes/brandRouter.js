const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Brand and device CHECKROLE может не работать, нужно  проверить!

router.post('/', checkRole('ADMIN'), brandController.create); // Метод создания
router.get('/', brandController.getAll); // Метод получения

module.exports = router;
