const express = require("express");

const usersController = require("../controllers/users");

const router = express.Router();

router.post("/user/signup", usersController.postAddUserDetails);

module.exports= router;
