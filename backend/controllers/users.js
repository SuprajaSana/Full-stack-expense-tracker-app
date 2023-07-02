const UserDetails = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function isStringValid(s) {
  if (s == undefined || s.length === 0) {
    return true;
  } else {
    return false;
  }
}

const generateAccessToken=(id, name, isPremiumUser)=> {
  return jwt.sign({userDetailId:id,name:name,isPremiumUser},process.env.TOKEN_SECRET)
}

const signUpUserDetails = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  if (
    isStringValid(userName) ||
    isStringValid(email) ||
    isStringValid(password)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Required all fields" });
  }

  const saltrounds = 10;
  bcrypt.hash(password, saltrounds, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    await UserDetails.create({
      userName: userName,
      email: email,
      password: hash,
    }).then((details) => {
      res.status(201).json({
        success: true,
        message: "Successfully created new user",
        userDetail: details,
      });
    })
      .catch(err => {
       res.status(500).json({ success: false, message: err });
    })
  });
};

const loginUserDetails = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (isStringValid(email) || isStringValid(password)) {
    return res
      .status(400)
      .json({ success: false, message: "Required all fields" });
  }

  await UserDetails.findAll({ where: { email: email } })
    .then((details) => {
      if (details.length > 0) {
        bcrypt.compare(password, details[0].password, (err, result) => {
          if (err) {
            throw new Error("Something went wrong");
          }
          if (result === true) {
            res
              .status(200)
              .json({
                success: true,
                message: "User login successful",
                userDetail: result,
                token: generateAccessToken(details[0].id,details[0].name,details[0].isPremiumUser),
              });
          } else {
            res
              .status(401)
              .json({ success: false, message: "Password does not match" });
          }
        })
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err });
    });
};

module.exports = {
  signUpUserDetails,
  loginUserDetails,
  generateAccessToken
}

