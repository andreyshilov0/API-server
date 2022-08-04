const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration); // Метод создания регистрации
router.post('/login', userController.login); // Метод авторизации
router.get('/auth', authMiddleware, userController.check); // Метод подтверждения авторизации

module.exports = router;
