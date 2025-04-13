const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = async (req, res, next) => {
  if(req.cookies.token){
    const decoded = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = await User.findOne({email: decoded.email}).select("-password");
    next();
  }else{
    res.status(401).json({ message: "Unauthorized" });
  }
  if(!req.cookies.token){
    res.status(401).json({ message: "bhai Token create kr pehle" });
  }
};

module.exports = { authMiddleware };
