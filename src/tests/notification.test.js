const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jsonwebtoken');
const prisma = require('./mocks/prisma'); // Import mocked Prisma

jest.mock('jsonwebtoken');

describe('Notification', () => {
    const mockUser = {
        user_id: 1,
        email: 'test@example.com'
    };
    const mockToken = jwt.sign(mockUser, process.env.JWT_SECRET);

    beforeEach(() => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, mockUser);
        });
    });

    describe('GET /api/v1/notifications/get/{user_id}', () => {
        test('Menampilkan notifikasi', async () => {
            prisma.notifications.findMany.mockResolvedValue([
                { id: 1, message: 'Notification 1' },
                { id: 2, message: 'Notification 2' },
            ]);

            const response = await request(app)
                .get('/api/v1/notifications/get/1')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([
                { id: 1, message: 'Notification 1' },
                { id: 2, message: 'Notification 2' },
            ]);
        });

        test('Notifikasi tidak ditemukan', async () => {
            prisma.notifications.findMany.mockResolvedValue([]);

            const response = await request(app)
                .get('/api/v1/notifications/get/1')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.notifications.findMany.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .get('/api/v1/notifications/get/1')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(500);
        });
    });

    describe('PATCH /api/v1/notifications/update/{notification_id}', () => {
        test('Update notifikasi', async () => {
            prisma.notifications.update.mockResolvedValue({
                notification_id: '77ea5767-7ed3-4594-8d61-799b0c332dbe',
                notification_is_read: true,
            });

            const response = await request(app)
                .patch('/api/v1/notifications/update/77ea5767-7ed3-4594-8d61-799b0c332dbe')
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ notification_is_read: true });

            expect(response.statusCode).toBe(200);
        });

        test('Notifikasi tidak ditemukan', async () => {
            prisma.notifications.update.mockResolvedValue(null);

            const response = await request(app)
                .patch('/api/v1/notifications/update/87ea5767-7ed3-4594-8d61-799b0c332dbe')
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ notification_is_read: true });

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.notifications.update.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .patch('/api/v1/notifications/update/87ea5767-7ed3-4594-8d61-799b0c332dbe')
                .set('Authorization', `Bearer ${mockToken}`)
                .send({ notification_is_read: true });

            expect(response.statusCode).toBe(500);
        });
    });
});
