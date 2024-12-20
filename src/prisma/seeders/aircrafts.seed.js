const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create aircrafts seeder
    await prisma.aircrafts.createMany({
        data: [
            {
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508',
                aircraft_manufacturer: 'Airbus',
                aircraft_type: 'A320'
            },
            {
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81',
                aircraft_manufacturer: 'Boeing',
                aircraft_type: 'B738'
            }
        ]
    })

    console.log('Seeding completed for Aircrafts table!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });