const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    // Здесь мы передаем несколько параметров id, email, role и секретный ключ который указан в .env, и длительность жизни токена
    expiresIn: '24h',
  });
};

class UserController {
  // Контроллер для пользователей
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if ((!email, !password)) {
      return next(ApiError.badRequest('Некорректный email или пароль'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5); // Хеширование пользователя , передаем пароль пользователя и сколько раз его будем хешировать
    const user = await User.create({ email, role, password: hashPassword }); // Создаем пользователя и передаем email , роль , пароль , пароль передаем уже захешированный
    const basket = await Basket.create({ userId: user.id }); // Вызываем функцию create у модели Basket и передаем id пользователя, который можно получить из созданного объекта самого пользователя
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password); // Сравниваем два пароля, первый который ввел пользователь, второй получаем уже из базы данных
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    let token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
