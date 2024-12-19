const request = require('supertest');
const app = require('../../src/app');
const prisma = require('./mocks/prisma');
const { expect, describe } = require('@jest/globals');

describe('Admin', () => {
    describe('GET /api/v1/user/all-users', () => {
        test('Get all users', async () => {
            prisma.users.findMany.mockResolvedValue(
                {
                    "user_id": "12345",
                    "user_name": "John Doe",
                    "user_email": "john.doe@example.com",
                    "user_phone": "+6281234567890"
                });

            const response = await request(app).get('/api/v1/user/all-users');

            expect(response.statusCode).toBe(200);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findMany.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/api/v1/user/all-users');

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST /api/v1/notifications/create', async () => {
        test('Create notification', async () => {
            prisma.notification.create.mockResolvedValue({
                "user_id": "12345",
                "notification_type": "PROMO",
                "notification_message": "This is a test notification"
            });

            const response = await request(app).post('/api/v1/notifications/create').send({
                "user_id": "12345",
                "notification_type": "PROMO",
                "notification_message": "This is a test notification"
            });

            expect(response.statusCode).toBe(201);
        });

        test('Tipe notifikasi tidak valid', async () => {
            const response = await request(app).post('/api/v1/notifications/create').send({
                "user_id": "12345",
                "notification_type": "INVALID_TYPE",
                "notification_message": "This is a test notification"
            });

            expect(response.statusCode).toBe(400);
        });

        test('User tidak ditemukan', async () => {
            const response = await request(app).post('/api/v1/notifications/create').send({
                "user_id": "000",
                "notification_type": "PROMO",
                "notification_message": "This is a test notification"
            });

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.notification.create.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/notifications/create').send({
                "user_id": "12345",
                "notification_type": "PROMO",
                "notification_message": "This is a test notification"
            });

            expect(response.statusCode).toBe(500);
        });
    });
});