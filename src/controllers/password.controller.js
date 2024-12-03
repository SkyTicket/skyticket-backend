const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendForgotPasswordEmail } = require("../controllers/mailer.controller");

class PasswordController {
  static async forgetPassword(req, res) {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = await prisma.users.findUnique({
      where: { user_email: email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.passwordResetToken.create({
      data: {
        token: token,
        userId: user.user_id,
      },
    });

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/password/reset-password?token=${token}`;

    try {
      await sendForgotPasswordEmail(email, resetLink);
      res.status(200).json({ message: "Reset link sent to email", resetLink });
    } catch (err) {
      console.error("Error sending email:", err.message);
      res.status(500).json({ message: "Failed to send email" });
    }
  }

  static async resetPassword(req, res) {
    const { token, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);

      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          token,
          user: { user_email: email },
        },
      });

      if (!resetToken) {
        return res.status(404).json({ message: "Invalid or expired token" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.users.update({
        where: { user_id: resetToken.userId },
        data: { user_password: hashedPassword },
      });

      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });

      res.status(200).json({
        message: "Password berhasil direset! Silakan login.",
      });
    } catch (err) {
      console.error("JWT verification error:", err.message);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  }
}

module.exports = PasswordController;
