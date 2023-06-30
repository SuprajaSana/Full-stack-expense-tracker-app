const UserDetails = require("../models/users");

function isStringValid(s){
  if (s == undefined || s.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.postAddUserDetails = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  if (isStringValid(userName) || isStringValid(email) || isStringValid(password)) {
    return res.status(400).json({err:"Required all fields"})
  }

  await UserDetails.create({
    userName: userName,
    email: email,
    password: password,
  })
    .then((details) => {
      res.status(201).json({ userDetail: details,message:"Successfully created new user" });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
