require('dotenv').config(); // Добавляем для добавления конфига .env

const express = require('express');
const sequelize = require('./db'); // Это для взаимодействия с БД
const cors = require('cors'); // Механизм для дополнительных http заголовков
const fileUpload = require('express-fileupload');
const models = require('./models/models'); // Модели ранее созданных БД
const PORT = process.env.PORT || 5000; // Как бы порт, но не до конца понятно
const router = require('./routes/index'); // Указываем корневой файл всех роутеров
const path = require('path');

const app = express();
app.use(cors()); // Заюзали CORS
app.use(express.json()); // для того чтобы сервак мог парсить json формат, обязательно
app.use(express.static(path.resolve(__dirname, 'static'))); // Ручное задание статической папки для объектов
app.use(fileUpload({}));
app.use('/api', router);

const start = async () => {
  // Создаем асинхронную функцию в которую докидываем пару методов
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is started on ${PORT}`)); // Слушаем порт и выводим данные в консоль!
  } catch (e) {
    console.log(e); // Обработка ошибок, стандарт
  }
};

start(); // Запуск прослушивания порта
