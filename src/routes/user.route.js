const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.put("/update-user/:id", UserController.editUser);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;
