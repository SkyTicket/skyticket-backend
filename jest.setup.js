jest.mock('@prisma/client', () => ({
    PrismaClient: require('./src/tests/mocks/prisma.js'),
}));