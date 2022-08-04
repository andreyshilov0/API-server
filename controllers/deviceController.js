const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
  // Контроллер для device
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files; // Получение картинки и файлов с помощью библиотеки fileUpload
      let fileName = uuid.v4() + '.jpg'; // Ещё более лютые приколы, это функция для создания уникального ID к которому приплюсовываем расширение картинки
      img.mv(path.resolve(__dirname, '..', 'static', fileName)); // Таким образом переместим нужный нам файл в заданную папку, тут же указан путь

      if (info) {
        info = JSON.parse(info); // Какая то схема преобразование для FRONTA and BACK end , парсим
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          }),
        );
      }

      const device = await Device.create({ name, price, brandId, typeId, img: fileName }); // Создаем метод, и соответственно передаем все параметры которые будут указаны в Postman

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1; // Выбор страницы
    limit = limit || 9; // Лимит товара
    let offset = page * limit - limit; //  Отступы, количество товара на одной странице
    let device;
    if (!brandId && !typeId) {
      device = await Device.findAndCountAll({ limit, offset }); // получает все объекты , findAll,  а findAndCountAll - предназначен для пагинации, поле rows покажет сколько товара доступно на данной странце
    }
    if (brandId && !typeId) {
      device = await Device.findAndCountAll({ where: brandId }, limit, offset); // получает только brand
    }
    if (!brandId && typeId) {
      device = await Device.findAndCountAll({ where: typeId }, limit, offset); // получает только typeId
    }
    if (brandId && typeId) {
      device = await Device.findAndCountAll({ where: { typeId, brandId } }, limit, offset); // получает brand and type
    }
    res.json(device);
  }
  async getOne(req, res) {
    const { id } = req.params; // Почему то получаем id из params , пока не понимаю
    const device = await Device.findOne({
      // Тут получаем один объект при включении отдельной карточки товара
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
