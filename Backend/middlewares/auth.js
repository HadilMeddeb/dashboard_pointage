const jwt = require('jsonwebtoken');
const config = require('config');
const key= config.get("jwtSecret");


function isauth (req, res, next)  {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
   
    const decoded = jwt.verify(token, key);
   
    // Add user from payload
    req.user = decoded;
    console.log('***************************')
    console.log("decoded user from token",decoded);
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
module.exports = isauth

