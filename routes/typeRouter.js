const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create); // Метод создания
router.get('/', typeController.getAll); // Метод получения

module.exports = router;
