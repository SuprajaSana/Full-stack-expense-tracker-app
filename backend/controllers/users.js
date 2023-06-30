const UserDetails = require("../models/users");

function isStringValid(s){
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

exports.loginUserDetails = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  await UserDetails.findAll({ where: { email: email } })
    .then((details) => {
      if (details[0].password === password) {
        res.status(200).json({message:"User login successful"})
      } else {
        res.status(401).json({message:"User not authorized"})
      }
    })
    .catch(err=>{
    res.status(404).json({error:err,message:"User not found"})
  })

}
