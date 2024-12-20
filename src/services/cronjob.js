const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Cron job gabungan untuk membersihkan data kedaluwarsa
cron.schedule("0 */2 * * *", async () => {
  const now = new Date();
  try {
    // Hapus token blacklist yang telah kedaluwarsa
    const deletedTokens = await prisma.tokenBlacklist.deleteMany({
      where: { expiredAt: { lt: now } },
    });
    console.log(
      `${deletedTokens.count} token blacklist kedaluwarsa telah dihapus.`
    );

    // Hapus OTP yang telah kedaluwarsa
    const deletedOtps = await prisma.otp.deleteMany({
      where: { otp_expires_at: { lt: now } },
    });
    console.log(`${deletedOtps.count} OTP kedaluwarsa telah dihapus.`);
  } catch (error) {
    console.error("Error saat membersihkan data kedaluwarsa:", error);
  }
});
