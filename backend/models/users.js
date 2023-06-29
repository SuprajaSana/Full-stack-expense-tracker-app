const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const UserDetails = sequelize.define("userDetail", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserDetails;
