const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create bookings seeder
    await prisma.bookings.createMany({
        data: [
            {
                booking_id: '407633dd-dfdc-4712-858a-b4533c06ae2a',
                booker_id: '4bef9438-e733-4538-8a47-acb80fe2ecc5', // Muhammad Joni (booker)
                booking_date: '2024-11-29T05:20:00.000Z',
                booking_amount: 2300000.00, // price of JT111, 2 adults
                booking_code: 'E1vRYncj1',
                booking_payment_status: 'COMPLETED',
                booking_payment_method: 'DEBIT_CARD'
            },
        ]
    })

    console.log('Seeding completed for Bookings table!');
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