const request = require('supertest');
const app = require('../../src/app');
const prisma = require('./mocks/prisma');
const { expect } = require('@jest/globals');

describe('Flights', () => {
    describe('GET /api/v1/airports', () => {
        test('Mencari bandara', async () => {
            const response = await request(app).get('/api/v1/airports/indonesia');
    
            expect(response.statusCode).toBe(200);
        });
    
        test('Data tidak ditemukan', async () => {
            const response = await request(app).get('/api/v1/airports/notfound');
    
            expect(response.statusCode).toBe(404);
        });
    
        test('Kesalahan pada server', async () => {
            prisma.airports.findMany.mockRejectedValue(new Error('Database error'));
    
            const response = await request(app).get('/api/v1/airports/indonesia');
    
            expect(response.statusCode).toBe(500);
        });
    });
    
    describe('GET /api/v1/seat-classes-price', () => {
        test('Mencari harga kelas kursi', async () => {
            const response = await request(app).get('api/v1/seat-classes-price?departure_airport=CKG&arrival_airport=DHX&is_round_trip=false');
    
            expect(response.statusCode).toBe(200);
        });
    
        test('Data belum lengkap', async () => {
            const response = await request(app).get('api/v1/seat-classes-price');
    
            expect(response.statusCode).toBe(400);
        });
    
        test('Penerbangan tidak ditemukan', async () => {
            const response = await request(app).get('api/v1/seat-classes-price?departure_airport=CKG&arrival_airport=DHX&is_round_trip=true');
    
            expect(response.statusCode).toBe(404);
        });
    });
    
    describe('GET /api/v1/flights', () => {
        test('Mencari penerbangan', async () => {
            const response = await request(app).get('/api/v1/flights?departure_airport=CKG&arrival_airport=DHX&is_round_trip=false&flight_departure_date=2024-12-21T20:16:27.230Z&seat_class_type=Economy&total_adult_passengers=1');
    
            expect(response.statusCode).toBe(200);
        });
    
        test('Kesalahan validasi data', async () => {
            const response = await request(app).get('/api/v1/flights');
    
            expect(response.statusCode).toBe(400);
        });
    
        test('Penerbangan tidak ditemukan', async () => {
            const response = await request(app).get('/api/v1/flights?departure_airport=CKG&arrival_airport=DHX&is_round_trip=true&flight_departure_date=2024-12-21T20:16:27.230Z&seat_class_type=Economy&total_adult_passengers=1');
    
            expect(response.statusCode).toBe(404);
        });
    
        test('Penerbangan penuh', async () => {
            const response = await request(app).get('/api/v1/flights?departure_airport=CKG&arrival_airport=DHX&is_round_trip=false&flight_departure_date=2024-12-21T20:16:27.230Z&seat_class_type=Economy&total_adult_passengers=6');
    
            expect(response.statusCode).toBe(422);
        });
    
        test('Kesalahan pada server', async () => {
            prisma.flights.findMany.mockRejectedValue(new Error('Database error'));
    
            const response = await request(app).get('/api/v1/flights?departure_airport=CKG&arrival_airport=DHX&is_round_trip=false&flight_departure_date=2024-12-21T20:16:27.230Z&seat_class_type=Economy&total_adult_passengers=1');
    
            expect(response.statusCode).toBe(500);
        });
    });
    
    describe('GET /api/v1/flights/detail', () => {
        test('Mengambil data penerbangan', async () => {
            const response = await request(app).get('/api/v1/flights/detail?flightId=1&seatClass=Economy&adult=1&child=1&baby=1');
    
            expect(response.statusCode).toBe(200);
        });
    
        test('Parameter tidak valid', async () => {
            const response = await request(app).get('/api/v1/flights/detail?flightId=a&seatClass=Economy&adult=b&child=c&baby=1');
    
            expect(response.statusCode).toBe(400);
        });
    
        test('Penerbangan tidak ditemukan', async () => {
            const response = await request(app).get('/api/v1/flights/detail?flightId=200&seatClass=Economy&adult=1&child=1&baby=1');
    
            expect(response.statusCode).toBe(404);
        });
    
        test('Kursi tidak ditemukan', async () => {
            const response = await request(app).get('/api/v1/flights/detail?flightId=1&seatClass=Economy&adult=1&child=1&baby=1');
    
            expect(response.statusCode).toBe(404);
        });
    });
})