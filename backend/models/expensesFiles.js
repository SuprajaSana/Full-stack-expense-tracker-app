const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const expensesFiles = sequelize.define("expenseFile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  expenseurl:Sequelize.STRING
});

module.exports = expensesFiles;