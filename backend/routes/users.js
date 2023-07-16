const express = require("express");

const usersController = require("../controllers/users");
const passwordController = require("../controllers/password");

const router = express.Router();

router.post("/user/signup", usersController.signUpUserDetails);

router.post("/user/login", usersController.loginUserDetails);

router.use("/user/forgotpassword", passwordController.forgotpassword);

router.get(
  "/updatepassword/:resetpasswordid",
  passwordController.updatepassword
);

router.get("/password/resetpassword/:id", passwordController.resetpassword);

module.exports = router;
