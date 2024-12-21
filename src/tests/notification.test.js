const { expect, test } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

jest.mock('jsonwebtoken');
jest.mock('crypto');

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
            const response = await request(app).get('/api/v1/notifications/get/1').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

            expect(response.statusCode).toBe(200);  
        });

        test('Notifikasi tidak ditemukan', async () => {
            const response = await request(app).get('/api/v1/notifications/get/1').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.notifications.findMany.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/v1/notifications/get/1').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

            expect(response.statusCode).toBe(500);
        });
    });
});

describe('PATCH /api/v1/notifications/update/{notification_id}', () => {
    test('Update notifikasi', async () => {
        prisma.notifications.update.mockResolvedValue({
            "notification_id": "77ea5767-7ed3-4594-8d61-799b0c332dbe",
            "notification_is_read": true,
        });

        const response = await request(app).patch('/api/v1/notifications/update/77ea5767-7ed3-4594-8d61-799b0c332dbe').set('Authorization', `Bearer ${mockToken}`).send({
            notification_is_read: true,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(200);
    });

    test('Notifikasi tidak ditemukan', async () => {
        const response = await request(app).patch('/api/v1/notifications/update/87ea5767-7ed3-4594-8d61-799b0c332dbe').set('Authorization', `Bearer ${mockToken}`).send({
            notification_is_read: true,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(404);
    });

    test('Kesalahan pada server', async () => {
        prisma.notifications.update.mockRejectedValue(new Error('Database error'));

        const response = await request(app).patch('/api/v1/notifications/update/87ea5767-7ed3-4594-8d61-799b0c332dbe').set('Authorization', `Bearer ${mockToken}`).send({
            notification_is_read: true,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(500);
    });
});