const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const config = require("../config/config.js");

const validateToken = async (req, res, next) => {
  try {
      if (!req.headers.authorization) {
          console.log(req.headers.authorizaTion)
      return res.status(401).json({
        message: "authorization header is required",
      });
    }
    const token = req.headers.authorization.split(' ')[1];

      console.log(token)
    if (!token) {
      return res.status(401).json({
        messages: "invalid token",
      });
    }

    const payload = jwt.verify(token, config.jwtSecret);
    if (!payload) {
      return res.status(401).json({
        message: "invalid token",
      });
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ message: "error fetching user" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  validateToken,
};

