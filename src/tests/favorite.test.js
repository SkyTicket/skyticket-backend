const request = require('supertest');
const app = require('../../src/app');
const prisma = require('./mocks/prisma');
// const { expect, describe } = require('@jest/globals');

describe('Favorite', () => {
    description('GET /api/v1/favorite-destination', () => {
        test('Menampilkan destinasi favorit', async () => {
            const response = await request(app).get('/api/v1/favorite-destination?page=1&continent=asia').expect('Content-Type', /json/);
    
            expect(response.statusCode).toBe(200);
        });
    
        test('Data tidak ditemukan', async () => {
            const response = await request(app).get('/api/v1/favorite-destination?page=1&continent=java').expect('Content-Type', /json/);
    
            expect(response.statusCode).toBe(404);
        });
    
        test('Kesalahan pada server', async () => {
            prisma.destinations.findMany.mockRejectedValue(new Error('Database error'));
    
            const response = await request(app).get('/api/v1/favorite-destination?page=1&continent=asia').expect('Content-Type', /json/);
    
            expect(response.statusCode).toBe(500);
        });
    });
})