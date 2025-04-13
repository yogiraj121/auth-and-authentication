const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = async (req, res, next) => {
  if(req.cookies.token){
    const decoded = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = await User.findOne({email: decoded.email}).select("-password");
    next();
  }else{
    res.status(401).json({ message: "Unauthorized : bhai token create kr pehle" });
  }
};

module.exports = { authMiddleware };
