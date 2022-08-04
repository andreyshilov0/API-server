const { Brand } = require('../models/models'); // Импортируем модель БД созданную ранее
const ApiError = require('../error/ApiError');

class BrandController {
  // Контроллер для device
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name }); // Создание типа Brand - a
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll(); // Показать все созданные объекты
    return res.json(brands);
  }
}

module.exports = new BrandController();
