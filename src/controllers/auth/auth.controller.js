const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;
const MailerController = require("./mailer.controller");

class AuthController {
  async login(req, res) {
    const { email, user_password } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { user_email: email },
      });

      if (!user) {
        return res.status(401).json({ message: "Email atau Password salah." });
      }

      if (user.user_is_active === "unverified") {
        return res.status(400).json({
          message:
            "Akun belum diverifikasi. Harap verifikasi melalui OTP terlebih dahulu.",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        user_password,
        user.user_password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email atau Password salah." });
      }

      const token = jwt.sign(
        {
          userID: user.user_id,
          email: user.user_email,
          role: user.user_role,
        },
        SECRET_KEY,
        { expiresIn: "5h" }
      );

      res.status(200).json({ message: "Login berhasil.", token });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat login.", error });
    }
  }

  async logout(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token diperlukan untuk logout." });
    }

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);

      const blacklistedToken = await prisma.tokenBlacklist.findUnique({
        where: { token: token },
      });

      if (blacklistedToken) {
        return res
          .status(400)
          .json({ message: "Token sudah diblacklist atau kedaluwarsa." });
      }

      await prisma.tokenBlacklist.create({
        data: {
          token,
          expiredAt: new Date(decodedToken.exp * 1000),
        },
      });

      res
        .status(200)
        .json({ message: "Logout berhasil. Token telah di-blacklist." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan saat proses logout.",
        error: error.message || error,
      });
    }
  }

  async register(req, res) {
    const { user_name, user_email, user_password, user_phone } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);

    try {
      const newUser = await prisma.users.create({
        data: {
          user_name,
          user_email,
          user_password: hashedPassword,
          user_phone,
          user_is_active: "unverified", // Enum untuk status user
        },
      });

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(otpCode, 10);

      await prisma.otp.create({
        data: {
          user_id: newUser.user_id,
          otp_code: hashedOtp,
          otp_expires_at: new Date(Date.now() + 10 * 60 * 1000), // Berlaku 10 menit
        },
      });

      await MailerController.sendOtpEmail(user_email, otpCode);

      res.status(201).json({
        message: "Registrasi berhasil. Kode OTP telah dikirim ke email Anda.",
      });
    } catch (error) {
      res.status(500).json({
        error: "Gagal mendaftarkan user.",
        detail: error.message,
      });
    }
  }

  async verifyOtp(req, res) {
    const { user_email, otp_code } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { user_email },
      });

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan." });
      }

      const otpRecord = await prisma.otp.findFirst({
        where: { user_id: user.user_id, otp_is_used: false },
      });

      if (!otpRecord) {
        return res
          .status(404)
          .json({ message: "Kode OTP tidak ditemukan atau sudah digunakan." });
      }

      const isValidOtp = await bcrypt.compare(otp_code, otpRecord.otp_code);
      if (!isValidOtp) {
        return res.status(400).json({ message: "Kode OTP salah." });
      }

      if (otpRecord.otp_expires_at < new Date()) {
        return res.status(400).json({ message: "Kode OTP telah kedaluwarsa." });
      }

      await prisma.otp.update({
        where: { otp_id: otpRecord.otp_id },
        data: { otp_is_used: true },
      });

      await prisma.users.update({
        where: { user_id: user.user_id },
        data: { user_is_active: "verified" },
      });

      res.status(200).json({ message: "Verifikasi berhasil." });
    } catch (error) {
      res.status(500).json({
        error: "Gagal memverifikasi kode OTP.",
        detail: error.message,
      });
    }
  }

  async resendOtp(req, res) {
    const { user_email } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { user_email },
      });

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan." });
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(otpCode, 10);

      await prisma.otp.upsert({
        where: { user_id: user.user_id },
        update: {
          otp_code: hashedOtp,
          otp_expires_at: new Date(Date.now() + 10 * 60 * 1000),
          otp_is_used: false,
        },
        create: {
          user_id: user.user_id,
          otp_code: hashedOtp,
          otp_expires_at: new Date(Date.now() + 10 * 60 * 1000),
        },
      });

      await MailerController.resendOtpEmail(user_email, otpCode);

      res.status(200).json({
        message: "Kode OTP telah dikirim ulang ke email Anda.",
      });
    } catch (error) {
      res.status(500).json({
        error: "Gagal mengirim ulang kode OTP.",
        detail: error.message,
      });
    }
  }
}

module.exports = new AuthController();
