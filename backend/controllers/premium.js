const User = require("../models/users");
const Expense = require("../models/expenses");
const sequelize=require("../util/database")

exports.getLeaderBoard = async (req, res, next) => {
    try {
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        const userExpensesAggregate = {};
        expenses.forEach(expense => {
            if (userExpensesAggregate[expense.userDetailId]) {
                userExpensesAggregate[expense.userDetailId] = userExpensesAggregate[expense.userDetailId] + expense.amount;
            } else {
                userExpensesAggregate[expense.userDetailId]=expense.amount
            }
        });
        var userLeaderBoard = [];
        users.forEach(user => {
            console.log(user.userName,user.id)
            userLeaderBoard.push({name:user.userName,totalExpenseAmount:userExpensesAggregate[user.id]}||0)
        })
        userLeaderBoard.sort((a, b) => b.totalExpenseAmount - a.totalExpenseAmount)
        res.status(200).json(userLeaderBoard)
    }
    catch(err) {
        res.status(500).json(err);
    }
}