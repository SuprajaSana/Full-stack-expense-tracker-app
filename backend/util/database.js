const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_tracker_app", "root", "Saana@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
