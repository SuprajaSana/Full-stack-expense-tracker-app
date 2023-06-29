const UserDetails = require("../models/users");

exports.postAddUserDetails = async (req, res, next) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  await UserDetails.create({
    userName: userName,
    email: email,
    password: password,
  })
    .then((details) => {
      res.status(200).json({ userDetail: details });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
