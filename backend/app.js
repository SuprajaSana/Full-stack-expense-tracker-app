const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const User = require("./models/users");
const Expense=require("./models/expenses") 

var cors = require("cors");

const app = express();

app.use(cors());

const userRoutes = require("./routes/users");
const expensesRoutes = require("./routes/expenses");

app.use(bodyParser.json({ extended: false }));

app.use(expensesRoutes);
app.use(userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
