const Sequelize = require('sequelize');
const sequelize = require('../configs/db_instance');

const user = sequelize.define('user', {
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  level: {
    type: Sequelize.STRING,
    defaultValue: 'operator',
  },
  // {
  //   // option
  // },
});

(async () => {
  await user.sync({ force: false });
})();

module.exports = user;
