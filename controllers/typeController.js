const { Type } = require('../models/models'); // Импортируем модель БД созданную ранее
const ApiError = require('../error/ApiError');

class TypeController {
  // Контроллер для device
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name }); // Создание типа
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll(); // Показать все созданные объекты
    return res.json(types);
  }
}

module.exports = new TypeController();
