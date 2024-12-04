const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create bookers seeder
    await prisma.bookers.createMany({
        data: [
            {
                booker_id: '4bef9438-e733-4538-8a47-acb80fe2ecc5',
                user_id: 'e2d1ebad-4661-487b-8319-d11d960a3460', // Muhammad Joni
                booker_email: 'joni@mail.com',
                booker_name: 'Muhammad Joni',
                booker_phone: '08851234567'
            },
        ]
    })

    console.log('Seeding completed for Bookers table!');
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