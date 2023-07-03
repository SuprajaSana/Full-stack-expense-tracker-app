const Expenses = require("../models/expenses");
const sequelize = require("../util/database");

exports.getExpenses = async (req, res, next) => {
  await req.user
    .getExpenses()
    .then((expenses) => {
      res.status(200).json({ expenses: expenses });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(500).json({ error: err });
    });
};

exports.postAddExpenses = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const expense = await req.user.createExpense(
      {
        amount: amount,
        description: description,
        category: category,
      },
      { transaction: t }
    );
    const totalExpensesAmount =
      Number(req.user.totalExpensesAmount) + Number(amount);
    await req.user.update(
      {
        totalExpensesAmount: totalExpensesAmount,
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    res.status(201).json({ expenses: expense });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err });
  }
};

exports.postDeleteExpenses = async (req, res, next) => {
 const t = await sequelize.transaction();
  try {
  const expenseId = req.params.id;
 /* await Expenses.destroy({
    where: { id: expenseId, userDetailId: req.user.id },
  })
    .then((noOfRows) => {
      if (noOfRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Trying to delete expense does not belongs to you",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfully" });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err });
    }); */
    const expense = await req.user.getExpenses(
      { where: { id: expenseId } },
      { transaction: t }
    );
    const totalExpensesAmount = Number(req.user.totalExpensesAmount) - Number(expense[0].amount);
    await req.user.update(
      {
        totalExpensesAmount: totalExpensesAmount,
      },
      {
        transaction: t,
      }
    );
   await Expenses.destroy({
     where: { id: expenseId, userDetailId: req.user.id },
   },{transaction:t});
     await t.commit();
    res.status(201).json({ success:true,message:"Deleted successfully" });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err });
  }
};
