const express = require("express");
const router = express.Router();
const {loginPages} = require("../controllers/auth.controller");
router.post("/login",loginPages);
module.exports = router;
