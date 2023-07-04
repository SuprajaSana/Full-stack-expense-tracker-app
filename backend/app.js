const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const User = require("./models/users");
const Expense = require("./models/expenses");
const Order = require("./models/orders");
const Forgotpassword = require("./models/password"); 

var cors = require("cors");

const app = express();

app.use(cors());

const userRoutes = require("./routes/users");
const expensesRoutes = require("./routes/expenses");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes=require("./routes/premium")

app.use(bodyParser.json({ extended: false }));

app.use(expensesRoutes);
app.use(userRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User); 

sequelize
  .sync()
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
