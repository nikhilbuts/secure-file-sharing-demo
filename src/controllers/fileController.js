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

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Only allow admins to delete any file
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== file.owner.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Permission denied. Admins or file owners only." });
    }

    await file.remove();
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  upload,
  deleteFile,
};
