const { Sequelize } = require('sequelize'); // ORM метод

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}); // Что то связанное с портами и с БД , пока не разобрался
