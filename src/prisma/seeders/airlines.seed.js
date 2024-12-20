const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create airlines seeder
    await prisma.airlines.createMany({
        data: [
            {
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a90ad',
                airline_name: 'Garuda Indonesia',
                airline_code: 'GA',
                Airline_logo: 'https://ik.imagekit.io/skyticket/airline_logo/GIA.png'
            },
            {
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a95ad',
                airline_name: 'Lion Air Indonesia',
                airline_code: 'JT',
                Airline_logo: 'https://ik.imagekit.io/skyticket/airline_logo/LNI.png'
            },
            {
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4z91h3',
                airline_name: 'Air Asia Indonesia',
                airline_code: 'QZ',
                Airline_logo: 'https://ik.imagekit.io/skyticket/airline_logo/AWQ.png'
            },
            {
                airline_id: 'c000cdc0-b0d5-4728-1662-8d6abc4z91h3',
                airline_name: 'Batik Air Indonesia',
                airline_code: 'ID',
                Airline_logo: 'https://ik.imagekit.io/skyticket/airline_logo/BTK.png'
            },
            {
                airline_id: 'c000cdc0-b0d5-4728-9711-8d6abc4z91h3',
                airline_name: 'Citilink',
                airline_code: 'QG',
                Airline_logo: 'https://ik.imagekit.io/skyticket/airline_logo/CTV.png'
            },
        ]
    })

    console.log('Seeding completed for Airlines table!');
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