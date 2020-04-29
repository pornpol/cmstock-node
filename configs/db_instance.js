const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: '9pol',
  password: 'qwertyui',
  database: 'cmstock',
  host: 'localhost',
  port: 5432,
});

(async () => {
  await sequelize.authenticate();
  // console.log(conn);
})();

module.exports = sequelize;
