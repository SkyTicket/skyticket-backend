const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

class AuthMiddleware {
  static async authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token diperlukan untuk akses." });
    }

    try {
      // Periksa apakah token sudah ada di blacklist
      const blacklistedToken = await prisma.tokenBlacklist.findUnique({
        where: { token: token },
      });

      if (blacklistedToken) {
        return res
          .status(401)
          .json({ message: "Token ini sudah diblacklist." });
      }

      // Verifikasi token
      const decoded = jwt.verify(token, SECRET_KEY);

      // Periksa apakah user terkait masih ada
      const user = await prisma.users.findUnique({
        where: { user_id: decoded.userID },
      });

      if (!user) {
        return res.status(401).json({ message: "User tidak ditemukan." });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token tidak valid.", error });
    }
  }
}

module.exports = AuthMiddleware;
