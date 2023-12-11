const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication.controllers");

router.post("/login", authController.post_login);
router.post("/register", authController.post_register);

module.exports = router;
