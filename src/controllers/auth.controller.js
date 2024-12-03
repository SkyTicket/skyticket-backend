const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

class AuthController {
  async login(req, res) {
    const { email, user_password } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: { user_email: email },
      });

      if (!user) {
        return res.status(404).json({ message: "Email tidak ditemukan." });
      }

      const isPasswordValid = await bcrypt.compare(
        user_password,
        user.user_password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password salah." });
      }

      const token = jwt.sign(
        {
          userID: user.user_id,
          email: user.user_email,
          role: user.user_role,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login berhasil.", token });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat login.", error });
    }
  }

  async registerCustomer(req, res) {
    const { user_name, user_email, user_password, user_phone, profilePicture } =
      req.body;

    const hashedPassword = await bcrypt.hash(user_password, 10);

    try {
      const newCustomer = await prisma.users.create({
        data: {
          user_name,
          user_email,
          user_password: hashedPassword,
          user_role: "buyer", // Role ditentukan berdasarkan enum UserRole
          user_phone,
        },
      });
      res.status(201).json(newCustomer);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Gagal mendaftarkan customer", detail: error });
      console.log(error);
    }
  }

  async registerAdmin(req, res) {
    const { user_name, user_email, user_password, user_phone, profilePicture } =
      req.body;

    const hashedPassword = await bcrypt.hash(user_password, 10);

    try {
      const newAdmin = await prisma.users.create({
        data: {
          user_name,
          user_email,
          user_password: hashedPassword,
          user_role: "admin", // Role ditentukan berdasarkan enum UserRole
          user_phone,
        },
      });
      res.status(201).json(newAdmin);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Gagal mendaftarkan admin", detail: error });
      console.log(error);
    }
  }
}

module.exports = new AuthController();
