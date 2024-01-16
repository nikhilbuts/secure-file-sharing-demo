const express = require("express");
const fileController = require("../controllers/fileController");
const authenticateUser = require("../middleware/authMiddleware");
const csrfProtection = require("../middleware/csrfMiddleware");

const router = express.Router();

router.post("/upload", authenticateUser, fileController.upload);
router.delete(
  "/files/:fileId",
  authenticateUser,
  csrfProtection,
  fileController.deleteFile
);

module.exports = router;
