const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { totp } = require("otplib"); // Import otplib
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;
const MailerController = require("./mailer.controller");

// Konfigurasi `otplib` (opsional, jika Anda ingin mengubah durasi OTP)
totp.options = { step: 60 }; // OTP berlaku selama 60 detik

class AuthController {
  async login(req, res) {
    const { email, user_password } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { user_email: email },
      });

      if (!user) {
        return res.status(404).json({ message: "Email atau Password salah." });
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
      // Memulai transaksi
      const result = await prisma.$transaction(async (prisma) => {
        // Membuat user baru
        const newUser = await prisma.users.create({
          data: {
            user_name,
            user_email,
            user_password: hashedPassword,
            user_phone,
            user_is_active: "unverified", // Status default "unverified"
          },
        });

        // Membuat OTP
        const secret = user_email; // Menggunakan email sebagai secret
        const otpCode = totp.generate(secret); // Menghasilkan kode OTP
        const hashedOtp = await bcrypt.hash(otpCode, 10);

        // Menambahkan OTP ke database dengan data tambahan
        const now = new Date();
        const otpRecord = await prisma.otp.create({
          data: {
            user_id: newUser.user_id,
            otp_code: hashedOtp,
            otp_expires_at: new Date(Date.now() + 60 * 1000), // Berlaku 1 menit
            otp_request_count: 1, // Set permintaan OTP pertama kali
            otp_request_reset_at: new Date(Date.now() + 1 * 60000), // Reset 1 menit ke depan
            last_otp_requested_at: now, // Waktu permintaan OTP pertama kali
          },
        });

        // Kirim email OTP
        const emailSent = await MailerController.sendOtpEmail(
          user_email,
          otpCode
        );

        if (!emailSent) {
          throw new Error("Gagal mengirim email OTP.");
        }

        return { otpRecord, newUser };
      });

      // Merespons registrasi berhasil
      res.status(201).json({
        message: "Registrasi berhasil. Kode OTP telah dikirim ke email Anda.",
        otp_request_reset_at: result.otpRecord.otp_request_reset_at,
        last_otp_requested_at: result.otpRecord.last_otp_requested_at,
      });
    } catch (error) {
      console.error("Error pada registrasi:", error);
      res.status(500).json({
        error: "Gagal mendaftarkan user.",
        detail: error.message,
      });
    }
  }

  async verifyOtp(req, res) {
    const { user_email, otp_code } = req.body;

    try {
      const user = await prisma.users.findUnique({ where: { user_email } });
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan." });
      }

      const otpRecord = await prisma.otp.findFirst({
        where: { user_id: user.user_id, otp_is_used: false },
      });

      if (!otpRecord || otpRecord.otp_expires_at < new Date()) {
        return res
          .status(400)
          .json({ message: "Kode OTP tidak valid atau telah kedaluwarsa." });
      }

      const isValidOtp = await bcrypt.compare(otp_code, otpRecord.otp_code);
      if (!isValidOtp) {
        return res.status(400).json({ message: "Kode OTP salah." });
      }

      await prisma.otp.update({
        where: { otp_id: otpRecord.otp_id },
        data: { otp_is_used: true },
      });

      await prisma.otp.delete({ where: { otp_id: otpRecord.otp_id } });

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

      // Memeriksa apakah ada record OTP yang belum digunakan
      const otpRecord = await prisma.otp.findFirst({
        where: { user_id: user.user_id, otp_is_used: false },
      });

      if (otpRecord) {
        // Handling jika user resend otp sebelum waktu tunggu selesai
        if (otpRecord.otp_request_reset_at > new Date()) {
          return res.status(400).json({
            message: "Silakan tunggu beberapa saat sebelum mencoba lagi.",
            last_otp_requested_at: otpRecord.last_otp_requested_at,
            otp_request_reset_at: otpRecord.otp_request_reset_at,
          });
        }

        // Reset otp_request_count jika waktu reset telah tercapai
        if (
          otpRecord.otp_request_reset_at <= new Date() &&
          otpRecord.otp_request_count >= 5
        ) {
          await prisma.otp.update({
            where: { otp_id: otpRecord.otp_id },
            data: {
              otp_request_count: 0, // Reset jumlah permintaan
            },
          });
        }

        // Cek jika jumlah permintaan sudah melebihi batas
        if (otpRecord.otp_request_count >= 5) {
          // Jika sudah melebihi batas percobaan, user diberi waktu tunggu 1 jam sebelum resend lagi
          const resetTime = new Date(Date.now() + 60 * 60000); // 1 jam

          await prisma.otp.update({
            where: { otp_id: otpRecord.otp_id },
            data: {
              otp_request_reset_at: resetTime,
            },
          });

          return res.status(400).json({
            message:
              "Anda sudah mencoba lebih dari 5 kali. Harap tunggu 1 jam.",
            last_otp_requested_at: otpRecord.last_otp_requested_at,
            otp_request_reset_at: resetTime,
          });
        }

        // Update record OTP untuk permintaan baru
        await prisma.otp.update({
          where: { otp_id: otpRecord.otp_id },
          data: {
            otp_request_count: otpRecord.otp_request_count + 1,
            otp_request_reset_at: new Date(Date.now() + 1 * 60000), // User diberi waktu tunggu 1 menit sebelum resend code
            last_otp_requested_at: new Date(), // Waktu permintaan OTP terakhir
          },
        });
      } else {
        // Jika tidak ada record OTP sebelumnya, maka akan buar record baru
        const otpCode = totp.generate(user_email); // Membuat OTP baru
        const hashedOtp = await bcrypt.hash(otpCode, 10);

        await prisma.otp.create({
          data: {
            user_id: user.user_id,
            otp_code: hashedOtp,
            otp_expires_at: new Date(Date.now() + 60 * 1000), // Berlaku 1 menit
            otp_request_count: 1,
            last_otp_requested_at: new Date(),
            otp_request_reset_at: new Date(Date.now() + 1 * 60000),
          },
        });
      }

      // Kirim ulang OTP
      const otpCode = totp.generate(user_email); // Membuat OTP baru
      const hashedOtp = await bcrypt.hash(otpCode, 10);

      await prisma.otp.update({
        where: { user_id: user.user_id },
        data: {
          otp_code: hashedOtp,
          otp_expires_at: new Date(Date.now() + 60 * 1000), // Berlaku 1 menit
          otp_is_used: false,
        },
      });

      await MailerController.resendOtpEmail(user_email, otpCode);

      res.status(200).json({
        message: "Kode OTP telah dikirim ulang ke email Anda.",
        last_otp_requested_at: new Date(),
        otp_request_reset_at: new Date(Date.now() + 1 * 60000),
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
