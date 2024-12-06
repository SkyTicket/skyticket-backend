const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class UserController {
  static async editUser(req, res) {
    const { id } = req.params;
    const { user_name, user_email, user_phone, user_password } = req.body;

    try {
      const updateData = {
        user_name,
        user_email,
        user_phone,
      };

      if (user_password) {
        const hashedPassword = await bcrypt.hash(user_password, 10);
        updateData.user_password = hashedPassword;
      }

      const updatedUser = await prisma.users.update({
        where: { user_id: id },
        data: updateData,
      });

      res.status(200).json({
        message: "User berhasil diperbarui",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error editing user:", error.message);
      res.status(500).json({ message: "Gagal memperbarui user" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await prisma.users.delete({
        where: { user_id: id },
      });

      res.status(200).json({ message: "User berhasil dihapus" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      res.status(500).json({ message: "Gagal menghapus user" });
    }
  }
}

module.exports = UserController;
