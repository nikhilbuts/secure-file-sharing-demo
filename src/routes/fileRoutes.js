const express = require("express");
const fileController = require("../controllers/fileController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload", authenticateUser, fileController.upload);

module.exports = router;
