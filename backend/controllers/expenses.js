const Expenses = require("../models/expenses");

exports.getExpenses = async (req, res, next) => {
  await Expenses.findAll()
    .then((expenses) => {
      res.status(200).json({ expenses: expenses });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(500).json({ error: err });
    });
};

exports.postAddExpenses = async (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  await Expenses.create({
    amount: amount,
    description: description,
    category: category,
  })
    .then((expenses) => {
      res.status(201).json({ expenses: expenses });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.postDeleteExpenses = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    await Expenses.destroy({ where: { id: expenseId } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
