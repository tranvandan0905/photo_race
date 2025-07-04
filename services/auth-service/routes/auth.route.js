const express = require("express");
const router = express.Router();
const {loginPages, loginAds} = require("../controllers/auth.controller");
router.post("/login",loginPages);
router.post("/loginAds",loginAds);
module.exports = router;
