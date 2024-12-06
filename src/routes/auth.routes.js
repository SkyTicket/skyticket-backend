const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/auth.controller");
// const { authMiddleware, authorizeRoles } = require("../middleware/auth");

router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/register/customer", authController.registerCustomer);
router.post("/auth/register/admin", authController.registerAdmin);
module.exports = router;
