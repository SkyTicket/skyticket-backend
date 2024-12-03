const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create tickets seeder
    await prisma.tickets.createMany({
        data: [
            {
                ticket_id: 'e44030c0-7030-45d5-b78a-97f4e8842eba',
                flight_id: '234a23a9-0bbb-44b5-a8a3-4f604c94b266', // JT111
                booking_id: '407633dd-dfdc-4712-858a-b4533c06ae2a', // booking code E1vRYncj1
                aircraft_seat_id: '99abe125-1bde-481e-bab7-bb3476efeef1', // 1A
                ticket_status: 'BOOKED',
                ticket_qr: 'https://dummy_qr_url_here.com/407633dd-dfdc-4712-858a-b4533c06ae2a' // uri is the booking_id
            },
            {
                ticket_id: '5a01e6db-fb31-4768-9eac-7a65a0eba562',
                flight_id: '234a23a9-0bbb-44b5-a8a3-4f604c94b266', // JT111
                booking_id: '407633dd-dfdc-4712-858a-b4533c06ae2a', // booking code E1vRYncj1
                aircraft_seat_id: '5d1b5fa8-1c33-4f7c-a13f-c39b78da23cf', // 1B
                ticket_status: 'BOOKED',
                ticket_qr: 'https://dummy_qr_url_here.com/407633dd-dfdc-4712-858a-b4533c06ae2a' // uri is the booking_id
            },
        ]
    })

    console.log('Seeding completed for Tickets table!');
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