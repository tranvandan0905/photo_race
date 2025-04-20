const express = require("express");
const router = express.Router();
const multer = require("multer");
const { postmidia, deletemidia } = require("../controllers/cloudinary.controller");
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/upload", upload.single("file"), postmidia);
router.delete("/delete", deletemidia);
module.exports = router;
