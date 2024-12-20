const nodemailer = require("nodemailer");

class MailerController {
  static async sendForgotPasswordEmail(email, resetLink) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new Error("Failed to send email");
    }
  }

  static async sendOtpEmail(email, otpCode) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verifikasi OTP untuk Registrasi",
      html: `<p>Untuk menyelesaikan pendaftaran Anda, masukkan kode OTP berikut:</p>
               <h3>${otpCode}</h3>
               <p>Kode ini akan kedaluwarsa dalam 1 menit.</p>`,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
      return result.accepted.length > 0; // Return true jika email berhasil dikirim
    } catch (error) {
      console.error("Error sending OTP email:", error.message);
      return false; // Mengembalikan false jika gagal
    }
  }

  static async resendOtpEmail(email, otpCode) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend OTP untuk Registrasi",
      html: `<p>Permintaan untuk mengirim ulang OTP diterima. Masukkan kode OTP berikut:</p>
               <h3>${otpCode}</h3>
               <p>Kode ini akan kedaluwarsa dalam 1 menit.</p>`,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log(`Resend OTP sent to ${email}`);
      return result.accepted.length > 0; // Return true jika email berhasil dikirim
    } catch (error) {
      console.error("Error sending resend OTP email:", error.message);
      return false; // Mengembalikan false jika gagal
    }
  }
}

module.exports = MailerController;
