const express = require("express");

const expensesController = require("../controllers/expenses");

const router = express.Router();

router.get("/get/expenses", expensesController.getExpenses);

router.post("/add/expenses", expensesController.postAddExpenses);

router.delete("/delete/expenses/:id", expensesController.postDeleteExpenses);

module.exports = router;
