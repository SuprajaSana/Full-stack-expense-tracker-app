const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authenticate = (req, res, next) => {
    try {
        const token = req.header("authorization");
        console.log("token",token)
        const user = jwt.verify(token, "somethingSecretKey");
        User.findByPk(user.userDetailId).then(user => {
            req.user = user;
            next();
        }).catch(err => {
            throw new Error(err)
        })
    }
    catch(err) {
        return res.status(401).json({ success: false,message:err }) 
    }
}

module.exports = { authenticate };