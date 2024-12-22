const request = require('supertest');
const app = require('../../src/app');
const prisma = require('./mocks/prisma');
// const { expect, jest, beforeEach, describe } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

jest.mock('jsonwebtoken');
jest.mock('crypto');

describe('POST /api/v1/ticket-order', () => {
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

    test('Membuat tiket pesanan', async () => {
        prisma.flight_seat_assignments.create.mockResolvedValue([
            {
                id: 1,
                seat_id: 'A1',
                available: true,
                flight_seat_class: {
                    seat_class_price: 100
                },
            },
        ]);
        prisma.booking.create.mockResolvedValue({
            booking_id: 1,
        });
        prisma.bookers.create.mockResolvedValue({
            booker_id: 1,
        });
        prisma.passengers.createMany.mockResolvedValue({});
        prisma.passengers.findMany.mockResolvedValue([{ passenger_id: 1}]);
        prisma.flight_seat_assignments.updateMany.mockResolvedValue({
            count: 1
        });
        prisma.tickets.createMany.mockResolvedValue({});

        crypto.randomBytes.mockReturnValue({
            toString: () => 'randomString'
        });

        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(201);
    });

    test('Invalid input', async () => {
        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('Kursi tidak valid', async () => {
        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('Jumlah kursi tidak sama dengan jumlah penumpang', async () => {
        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('Kursi tidak tersedia', async () => {
        prisma.flight_seat_assignments.create.mockResolvedValue([
            {
                id: 1,
                seat_id: 'A1',
                available: false,
                flight_seat_class: {
                    seat_class_price: 100
                },
            },
        ]);

        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('UserId tidak ditemukan', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, null);
        });

        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(401);
    });

    test('Kesalahan pada server', async () => {
        prisma.flight_seat_assignments.create.mockRejectedValue(new Error('Database error'));

        const response = await request(app).post('/api/v1/ticket-order').set('Authorization', `Bearer ${mockToken}`).send({
            seats: [{ id: 1 }], passengers: [
                { 
                    title: "Mr", name: "John", familyName: "Doe", dateOfBirth: "01-01-1990", nationality: "ID", identityNumber: "1234567890123456", issuingCountry: "ID" 
                }
            ], bookerName: "Jane Doe", bookerEmail: "jane.doe@example.com", 
            bookerPhone: "08851234567"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(500);
    });
});

describe('GET /api/v1/transaksi', () => {
    test('Menampilkan transaksi', async () => {
        const response = await request(app).get('/api/v1/transaksi').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(200);
    });

    test('Transaksi tidak ditemukan', async () => {
        const response = await request(app).get('/api/v1/transaksi').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(404);
    });

    test('Kesalahan pada server', async () => {
        prisma.ticket_orders.findMany.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/api/v1/transaksi').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(500);
    });
});

describe('GET /api/v1/transaksi/user', () => {
    test('Menampilkan transaksi', async () => {
        const response = await request(app).get('/api/v1/transaksi/user').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(200);
    });

    test('Bad request', async () => {
        const response = await request(app).get('/api/v1/transaksi/user').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('Transaksi tidak ditemukan pada pengguna ini', async () => {
        const response = await request(app).get('/api/v1/transaksi/user').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(404);
    });

    test('ID pengguna tidak valid', async () => {
        const response = await request(app).get('/api/v1/transaksi/user').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('Kesalahan pada server', async () => {
        prisma.ticket_orders.findMany.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/api/v1/transaksi/user').set('Authorization', `Bearer ${mockToken}`).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(500);
    });
});

describe('POST /api/v1/booking/{bookingId}', () => {
    test('Membuat pembayaran untuk pesanan', async () => {
        const response = await request(app).post('/api/v1/booking/1').set('Authorization', `Bearer ${mockToken}`).send({
            bookingId: 1,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(201);
    });

    test('Permintaan tidak valid', async () => {
        const response = await request(app).post('/api/v1/booking/1').set('Authorization', `Bearer ${mockToken}`).send({
            bookingId: 1,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('Detail pengguna tidak lengkap', async () => {
        const response = await request(app).post('/api/v1/booking/1').set('Authorization', `Bearer ${mockToken}`).send({
            bookingId: 1,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(400);
    });

    test('ID bookings tidak ditemukan', async () => {
        const response = await request(app).post('/api/v1/booking/100').set('Authorization', `Bearer ${mockToken}`).send({
            bookingId: 100,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(404);
    });

    test('ID pengguna tidak ditemukan', async () => {
        const response = await request(app).post('/api/v1/booking/1').set('Authorization', `Bearer ${mockToken}`).send({
            bookingId: 1,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(404);
    });

    test('Kesalahan pada server', async () => {
        prisma.ticket_orders.findUnique.mockRejectedValue(new Error('Database error'));

        const response = await request(app).post('/api/v1/booking/1').set('Authorization', `Bearer ${mockToken}`).send({
            bookingId: 1,
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(500);
    });
});

describe('POST /api/v1/payment/notification', () => {
    test('Pembayaran berhasil', async () => {
        const response = await request(app).post('/api/v1/payment/notification').set('Authorization', `Bearer ${mockToken}`).send({
            "order_id": "08c7d800",
            "transaction_status": "settlement",
            "payment_type": "credit_card"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(200);
    });

    test('ID pesanan tidak ditemukan', async () => {
        const response = await request(app).post('/api/v1/payment/notification').set('Authorization', `Bearer ${mockToken}`).send({
            "order_id": "xxxx",
            "transaction_status": "settlement",
            "payment_type": "credit_card"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(404);
    });

    test('Kesalahan pada server', async () => {
        prisma.ticket_orders.findUnique.mockRejectedValue(new Error('Database error'));

        const response = await request(app).post('/api/v1/payment/notification').set('Authorization', `Bearer ${mockToken}`).send({
            "order_id": "08c7d800",
            "transaction_status": "settlement",
            "payment_type": "credit_card"
        }).expect('Content-Type', /json/);

        expect(response.statusCode).toBe(500);
    });
});