const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    // Generate and save the token
    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(400).json({ error: "Invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    console.log("Entered Password:", password, "Length:", password.length);
    console.log(
      "Stored Hashed Password:",
      user.password,
      "Length:",
      user.password.length
    );

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("isMatch:", isMatch); // Add this line

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    console.error("Error Found", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
