const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      throw new Error("Invalid Authorization header");
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateUser;
