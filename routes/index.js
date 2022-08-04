const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter'); // Иморт всех роутеров которые были созданы
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const errorHandler = require('../middleware/ErrorHandlingMiddleware');

router.use('/user', userRouter); // Здесь указывается первым параметром путь, а вторым параметром созданная переменная роутера
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

// Обработка ошибок, последний middleware
router.use(errorHandler);

module.exports = router;

// настройка маршрутов
