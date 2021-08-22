const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config =require('config');
const key=config.get("jwtSecret");
function isAdmin(req, res, next) {

  const token = req.header("x-auth-token");
  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    // Verify token
    const decoded = jwt.verify(token, key);
    // Add user from payload
    req.user = decoded;
    console.log("decoded user from token");

    User.findById({ _id: decoded.id }, (err, user) => {
      if (!user) {
        res.status(400).json({ msg: "user  does not exist" });
      } else {
        if (user.__t === "Admin") {
          next();
        } else {
            console.log(user)
          res.status(400).json({ msg: "you are not admin !" });
        }
      }
    });
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}
module.exports = isAdmin;