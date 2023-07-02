require("dotenv").config();

const razorpay = require("razorpay");

const Order = require("../models/orders");

const usersController = require("./users");

exports.purchasePremium = async (req, res, next) => {
  try {
    const raz = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 9000;
    raz.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: raz.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  try {
    const userDetailId = req.user.id;
    const { payment_id, order_id, status } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const p1 = order.update({ paymentid: payment_id, status: status });
    const p2 = req.user.update({ isPremiumUser: true });
    Promise.all([p1, p2])
      .then(() => {
        return res
          .status(202)
          .json({
            success: true,
            message: "Transaction Successful",
            token: usersController.generateAccessToken(
              userDetailId,
              undefined,
              true
            ),
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};
