const User = require("../models/users");
const Expense = require("../models/expenses");
const sequelize = require("../util/database");

exports.getLeaderBoard = async (req, res, next) => {
    try {
        const leaderBoardDetails = await User.findAll({
            order:[['totalExpensesAmount','DESC']]
        })
        res.status(200).json(leaderBoardDetails);
    }
    catch(err) {
        res.status(500).json(err);
    }
}