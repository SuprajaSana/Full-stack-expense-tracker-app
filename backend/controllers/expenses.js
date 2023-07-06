const Expenses = require("../models/expenses");
const sequelize = require("../util/database");
const UserServices = require('../services/userservices');
const S3Services=require('../services/s3services')

require("dotenv").config();

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

exports.downloadExpenses = async (req, res) => {
  try {
    const expenses = await UserServices.getExpenses(req);
    const stringifyExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const fileName = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await S3Services.uploadToS3(stringifyExpenses, fileName);
    await req.user.createExpenseFile({
      expenseurl:fileURL
    })
    res.status(200).json({ fileURL, success: true })
  } catch (err) {
    res.status(500).json({fileURL:'', success: false,err:err })
  }
}

exports.getExpenseFiles = async (req, res, next) => {
  await req.user
    .getExpenseFiles()
    .then((expenseurls) => {
      res.status(200).json({ expenseurls: expenseurls });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      res.status(500).json({ error: err });
    });
};
