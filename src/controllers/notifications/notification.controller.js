const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const DateTimeUtils = require('../../libs/datetime');
const { notification } = require('midtrans-client/lib/snapBi/snapBi');

class NotificationController {
    static async create(req, res) {
        const { user_id, notification_type, notification_message } = req.body;

        try {
            const user = await prisma.users.findUnique({
                where: { user_id },
            })

            if (!user) {
                return res.status(404).json({ message: 'User tidak ditemukan' });
            }

            if (!["PROMO", "SCHEDULE_CHANGE"].includes(notification_type)) {
                return res.status(400).json({ message: 'Tipe notifikasi tidak valid' });
            }

            const newNotification = await prisma.notifications.create({
                data: {
                    user_id,
                    notification_type,
                    notification_message,
                    notification_is_read: false
                },
            });

            res.status(201).json({ message: 'Notifikasi berhasil dikirim', notification: newNotification });
        } catch (error) {
            console.error('Error mengirim notifikasi: ', error);
            res.status(500).json({ message: 'Kesalahan pada server' });
        }
    }

    static async getNotifications(req, res) {
        const userId = req.user.user_id; // Menggunakan user_id yang diambil dari token

        try {
            const notifications = await prisma.notifications.findMany({
                where: {
                    user_id: userId
                },
                orderBy: {
                    notification_created_at: 'desc'
                },
            });

            if (notifications.length === 0) {
                return res.status(404).json({ message: 'Tidak ada notifikasi' });
            }

            const formattedNotifications = notifications.map((notification) => {
                let formattedNotificationType;

                switch(notification.notification_type){
                    case 'PROMO':
                        formattedNotificationType = 'Promo';
                        break;
                    case 'SCHEDULE_CHANGE':
                        formattedNotificationType = 'Perubahan Jadwal';
                        break;
                    case 'TRANSACTION':
                        formattedNotificationType = 'Transaksi';
                        break;
                    case 'USER_DATA_UPDATE':
                        formattedNotificationType = 'Update Data Pengguna'
                        break;
                    case 'WELCOME_MSG':
                        formattedNotificationType = 'Halo!';
                        break
                }

                return {
                    notification_id: notification.notification_id,
                    user_id: notification.user_id,
                    notification_type: formattedNotificationType,
                    notification_message: notification.notification_message,
                    notification_is_read: notification.notification_is_read,
                    notification_created_at: DateTimeUtils.formatDateForNotification(notification.notification_created_at)
                }
            })

            return res.status(200).json({
                status: 'success',
                notifications: formattedNotifications
            });
        } catch (error) {
            console.error('Error mengambil notifikasi: ', error);
            res.status(500).json({ message: 'Kesalahan pada server' });
        }
    }

    static async updateNotificationStatus(req, res) {
        const { notification_id } = req.params;
        const { notification_is_read } = req.body;

        try {
            if (typeof notification_is_read !== 'boolean') {
                return res.status(400).json({ message: 'Status notifikasi harus berupa boolean (true/false)' });
            }

            const notification = await prisma.notifications.findUnique({
                where: {
                    notification_id
                },
            });

            if (!notification) {
                return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
            }

            const updatedNotification = await prisma.notifications.update({
                where: { notification_id },
                data: { notification_is_read },
            });

            res.status(200).json({ message: 'Status notifikasi diperbarui', notification: updatedNotification });
        } catch (error) {
            console.error('Error memperbarui status notifikasi: ', error);
            res.status(500).json({ message: 'Kesalahan pada server' });
        }
    }
}

module.exports = NotificationController;