const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use("/api/", limiter);

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
