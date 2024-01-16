const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  description: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("File", fileSchema);
