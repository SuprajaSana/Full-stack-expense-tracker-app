const UserDetails = require("../models/users");

function isStringValid(s) {
  if (s == undefined || s.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.signUpUserDetails = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  if (
    isStringValid(userName) ||
    isStringValid(email) ||
    isStringValid(password)
  ) {
    return res.status(400).json({ success:false,message: "Required all fields" });
  }

  await UserDetails.create({
    userName: userName,
    email: email,
    password: password,
  })
    .then((details) => {
      res.status(201).json({
        success:true,
        message: "Successfully created new user",
        userDetail: details,
      });
    })
    .catch((err) => res.status(500).json({ success:false,message:err }));
};

exports.loginUserDetails = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (isStringValid(email) || isStringValid(password)) {
    return res.status(400).json({ success:false,message: "Required all fields" });
  }

  await UserDetails.findAll({ where: { email: email } })
    .then((details) => {
      if (details.length > 0) {
        if (details[0].password === password) {
          res
            .status(200)
            .json({ success: true, message: "User login successful" });
        } else {
          res
            .status(401)
            .json({ success: false, message: "User not authorized" });
        }
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err });
    });
};
