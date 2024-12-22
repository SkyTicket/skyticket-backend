const { mockDeep, mockReset } = require('jest-mock-extended');
const { PrismaClient } = require('@prisma/client');
// const { jest } = require('@jest/globals');
const prisma = mockDeep();

beforeEach(() => {
    mockReset(prisma);
});

module.exports = prisma;