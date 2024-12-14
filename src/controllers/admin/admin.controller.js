const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const tokenBlacklist = new Set();
const SECRET_KEY = process.env.JWT_SECRET;

class adminController {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prisma.users.findUnique({ where: { user_email: email } });

            if (email !== user.user_email) {
                return res.status(404).json({ message: 'User tidak ditemukan' });
            }

            if (user.user_role !== 'admin') {
                return res.status(401).json({ message: 'Access tidak diizinkan' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.user_password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Kesalahan pada email atau password' });
            }

            const token = jwt.sign(
                {
                    user_id: user.user_id,
                    user_role: user.user_role,
                },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login berhasil', token,
                user: {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    user_email: user.user_email,
                    user_role: user.user_role
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Kesalahan pada server" });
        }
    }

    static async logout(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (tokenBlacklist.has(token)) {
            return res.status(403).json({ message: 'Token masuk kedalam blacklisted' });
        }

        try {
            jwt.verify(token, SECRET_KEY);
            tokenBlacklist.add(token);
            res.status(200).json({ message: 'Logout berhasil' });
        } catch (error) {
            res.status(403).json({ message: 'Invalid token' });
        }
    }
}

module.exports = adminController;