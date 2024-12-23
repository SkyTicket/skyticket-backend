const request = require('supertest');
const app = require('../../src/app');
const prisma = require('./mocks/prisma');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

jest.mock('jsonwebtoken');
jest.mock('crypto');

describe('User', () => {
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

    describe('GET /api/v1/user/get-user', () => {
        test('Get user by id', async () => {
            prisma.users.findUnique.mockResolvedValue({
                user_id: "12345",
                user_name: "John Doe",
                user_email: "john.doe@example.com",
                user_phone: "+6281234567890",
            });

            const response = await request(app)
                .get('/api/v1/user/get-user/12345')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(200);
        });

        test('User tidak ditemukan', async () => {
            prisma.users.findUnique.mockResolvedValue(null);

            const response = await request(app)
                .get('/api/v1/user/get-user/12345')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .get('/api/v1/user/get-user/12345')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(500);
        });
    });

    describe('PUT /api/v1/user/update-user', () => {
        test('Update user by id', async () => {
            prisma.users.update.mockResolvedValue({
                user_id: "12345",
                user_name: "John Doe",
                user_email: "john.doe@example.com",
                user_phone: "+6281234567890",
            });

            const response = await request(app)
                .put('/api/v1/user/update-user/12345')
                .set('Authorization', `Bearer ${mockToken}`)
                .send({
                    user_name: "John Doe",
                    user_email: "john.doe@example.com",
                    user_phone: "+6281234567890",
                    user_password: "password123",
                });

            expect(response.statusCode).toBe(200);
        });

        test('Data tidak valid', async () => {
            const response = await request(app)
                .put('/api/v1/user/update-user/12345')
                .set('Authorization', `Bearer ${mockToken}`)
                .send({
                    user_name: 123,
                    user_email: "john.doe@example.com",
                    user_phone: "+6281234567890",
                    user_password: "password123",
                });

            expect(response.statusCode).toBe(400);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.update.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put('/api/v1/user/update-user/12345')
                .set('Authorization', `Bearer ${mockToken}`)
                .send({
                    user_name: "John Doe",
                    user_email: "john.doe@example.com",
                    user_phone: "+6281234567890",
                    user_password: "password123",
                });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('DELETE /api/v1/user/delete-user', () => {
        test('Delete user by id', async () => {
            prisma.users.delete.mockResolvedValue({
                user_id: "12345",
                user_name: "John Doe",
                user_email: "john.doe@example.com",
                user_phone: "+6281234567890",
            });

            const response = await request(app)
                .delete('/api/v1/user/delete-user/12345')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(200);
        });

        test('User tidak ditemukan', async () => {
            prisma.users.delete.mockResolvedValue(null);

            const response = await request(app)
                .delete('/api/v1/user/delete-user/12345')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.delete.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .delete('/api/v1/user/delete-user/12345')
                .set('Authorization', `Bearer ${mockToken}`);

            expect(response.statusCode).toBe(500);
        });
    });
});
