const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/auth.controller");
// const { authMiddleware, authorizeRoles } = require("../middleware/auth");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);

module.exports = router;