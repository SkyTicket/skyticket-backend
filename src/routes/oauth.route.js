const express = require("express");
const passport = require("passport"); // Tidak perlu memanggil fungsi langsung, instance otomatis
const router = express.Router();

// Redirect ke Google untuk login
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback setelah login
router.get(
  "/auth/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send(`Halo ${req.user.user_name}, Anda berhasil login dengan OAuth!`);
  }
);

module.exports = router;
