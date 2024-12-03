const express = require("express");
const PasswordController = require("../controllers/password.controller");

const router = express.Router();
router.post("/forget-password", PasswordController.forgetPassword);
router.post("/reset-password", PasswordController.resetPassword);

module.exports = router;
