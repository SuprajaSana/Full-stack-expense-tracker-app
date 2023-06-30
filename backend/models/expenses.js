const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Expenses = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  amount: Sequelize.DOUBLE,
});

module.exports = Expenses;
