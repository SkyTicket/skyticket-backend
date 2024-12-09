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
      const decoded = jwt.verify(token, SECRET_KEY);

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
