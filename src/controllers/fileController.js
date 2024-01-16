const File = require("../models/File");

const upload = async (req, res) => {
  try {
    const { filename, description } = req.body;
    const file = new File({ owner: req.user._id, filename, description });
    await file.save();
    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.log("ERRRRRR", error.message);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  upload,
};
