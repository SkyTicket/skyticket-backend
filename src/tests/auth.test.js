const request = require('supertest');
const app = require('../../src/app');
const prisma = require('./mocks/prisma');
// const { expect } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

jest.mock('jsonwebtoken');
jest.mock('crypto');

describe('Auth', () => {
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
    describe('POST /api/v1/auth/login', () => {
        test('User berhasil login', async () => {
            prisma.users.findUnique.mockResolvedValue({
                "email": "user@example.com",
                "user_password": "password123"
            });

            const response = await request(app).post('/api/v1/auth/login').send({
                "email": "user@example.com",
                "user_password": "password123"
            });

            expect(response.statusCode).toBe(200);
        });

        test('User belum memverifikasi OTP', async () => {
            prisma.users.findUnique.mockResolvedValue({
                "user_email": "user@example.com",
                "user_is_active": "unverified"
            });

            const response = await request(app).post('/api/v1/auth/login').send({
                "email": "user@example.com",
                "user_password": "password123"
            });

            expect(response.statusCode).toBe(400);
        });

        test('Password salah', async () => {
            prisma.users.findUnique.mockResolvedValue({
                "email": "user@example.com",
                "user_password": "wrongPassword"
            });

            const response = await request(app).post('/api/v1/auth/login').send({
                "email": "user@example.com",
                "user_password": "wrongPassword"
            });

            expect(response.statusCode).toBe(401);
        });

        test('Email tidak ditemukan', async () => {
            prisma.users.findUnique.mockResolvedValue({
                "email": "notFound@example.com",
                "user_password": "password123"
            });

            const response = await request(app).post('/api/v1/auth/login').send({
                "email": "notFound@example.com",
                "user_password": "password123"
            });

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/auth/login').send({
                "email": "user@example.com",
                "user_password": "password123"
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST /api/v1/auth/logout', () => {
        test('User berhasil logout', async () => {
            const response = await request(app).post('/api/v1/auth/logout').set('Authorization', 'Bearer InvalidToken');

            expect(response.statusCode).toBe(200);
        });

        test('Token tidak valid', async () => {
            const response = await request(app).post('/api/v1/auth/logout').set('Authorization', 'Bearer InvalidToken');

            expect(response.statusCode).toBe(401);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
            .post('/api/v1/auth/logout')
            .set('Authorization', 'Bearer InvalidToken');

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST /api/v1/auth/register', () => {
        test('User berhasil register', async () => {
            const response = await request(app).post('/api/v1/auth/register').send({
                "user_name": "John Doe",
                "user_email": "john.doe@example.com",
                "user_password": "password123",
                "user_phone": "+6281234567890"
            });

            expect(response.statusCode).toBe(201);
        });

        test('Email atau nomor telepon sudah terdaftar', async () => {
            const response = await request(app).post('/api/v1/auth/register').send({
                "user_name": "John Doe",
                "user_email": "john.doe@example.com",
                "user_password": "password123",
                "user_phone": "+6281234567890"
            });

            expect(response.statusCode).toBe(400);  
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/auth/register').send({
                "user_name": "John Doe",        
                "user_email": "john.doe@example.com",
                "user_password": "password123",
                "user_phone": "+6281234567890"
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST api/v1/auth/verify-otp', () => {
        test('User berhasil verifikasi OTP', async () => {
            const response = await request(app).post('/api/v1/auth/verify-otp').send({
                "user_email": "john.doe@example.com",
                "otp_code": "123456"
            });

            expect(response.statusCode).toBe(200);
        });

        test('OTP salah atau sudah kedaluwarsa', async () => {
            const response = await request(app).post('/api/v1/auth/verify-otp').send({
                "user_email": "john.doe@example.com",
                "otp_code": "123456"
            });

            expect(response.statusCode).toBe(400);  
        });

        test('Pengguna tidak ditemukan', async () => {
            const response = await request(app).post('/api/v1/auth/verify-otp').send({
                "user_email": "notFound@example.com",
                "otp_code": "123456"
            });

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/auth/verify-otp').send({
                "user_email": "john.doe@example.com",        
                "otp_code": "123456"
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST api/v1/auth/resend-otp', () => {
        test('OTP berhasil dikirim ulang', async () => {
            const response = await request(app).post('/api/v1/auth/resend-otp').send({
                "user_email": "john.doe@example.com"
            });

            expect(response.statusCode).toBe(200);
        });
    
        test('Permintaan tidak valid', async () => {
            const response = await request(app).post('/api/v1/auth/resend-otp').send({
                "user_email": "invalid-email@mail.com"
            });
    
            expect(response.statusCode).toBe(400);
        });

        test('Pengguna tidak ditemukan', async () => {
            const response = await request(app).post('/api/v1/auth/resend-otp').send({
                "user_email": "notFound@example.com"
            });

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/auth/resend-otp').send({
                "user_email": "john.doe@example.com"
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST api/v1/auth/forgot-password', () => {
        test('Password berhasil direset', async () => {
            const response = await request(app).post('/api/v1/auth/forgot-password').send({
                "email": "john.doe@example.com"
            });

            expect(response.statusCode).toBe(200);
        });

        test('Email tidak ditemukan', async () => {
            const response = await request(app).post('/api/v1/auth/forgot-password').send({
                "email": "notFound@example.com"
            });

            expect(response.statusCode).toBe(400);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/auth/forgot-password').send({
                "email": "john.doe@example.com"
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('POST api/v1/auth/reset-password', () => {
        test('Password berhasil direset', async () => {
            const response = await request(app).post('/api/v1/auth/reset-password').set('Authorization', `Bearer ${mockToken}`).send({
                "token": "reset_password_token",
                "password": "newPassword123",
                "confirmPassword": "newPassword123"    
            });

            expect(response.statusCode).toBe(200);
        });

        test('validasi gagal', async () => {
            const response = await request(app).post('/api/v1/auth/reset-password').set('Authorization', `Bearer ${mockToken}`).send({
                "token": "invalid_token",
                "password": "newPassword123",
                "confirmPassword": "newPassword123"    
            });

            expect(response.statusCode).toBe(400);
        });

        test('Token kadaluarsa', async () => {
            const response = await request(app).post('/api/v1/auth/reset-password').set('Authorization', `Bearer ${mockToken}`).send({
                "token": "expired_token",
                "password": "newPassword123",
                "confirmPassword": "newPassword123"   
            });

            expect(response.statusCode).toBe(404);
        });

        test('Kesalahan pada server', async () => {
            prisma.users.findUnique.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/api/v1/auth/reset-password').set('Authorization', `Bearer ${mockToken}`).send({
                "token": "reset_password_token",
                "password": "newPassword123",
                "confirmPassword": "newPassword123"    
            });

            expect(response.statusCode).toBe(500);
        });
    });
});