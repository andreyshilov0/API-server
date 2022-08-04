const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    // Проверка на принадлежность к классу ApiError
    return res.status(err.status).json({ message: err.message }); // Если принадлежит то вывод сообщение err.message, чтобы функция завершилась нужно ставить return!
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
