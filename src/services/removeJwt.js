const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

cron.schedule("0 */2 * * *", async () => {
  const now = new Date();
  try {
    await prisma.tokenBlacklist.deleteMany({
      where: { expiredAt: { lt: now } },
    });
    console.log("Blacklist token kedaluwarsa telah dihapus.");
  } catch (error) {
    console.error("Error saat membersihkan token kedaluwarsa:", error);
  }
});
