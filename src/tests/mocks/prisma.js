const { mockDeep, mockReset, mock } = require('jest-mock-extended');
const { PrismaClient } = require('@prisma/client');
const mockPrisma = mockDeep(PrismaClient);

beforeEach(() => {
    mockReset(PrismaClient);
})

module.exports = mockPrisma;