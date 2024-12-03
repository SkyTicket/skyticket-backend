const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create seat_classes seeder
    await prisma.seat_classes.createMany({
        data: [
            {
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823',
                seat_class_type: 'Economy'
            },
            {
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae',
                seat_class_type: 'Business'
            },
            {
                seat_class_id: '595a552f-1e53-4e7a-9dc9-5a355af0f029',
                seat_class_type: 'FirstClass'
            },
            {
                seat_class_id: '68464c4c-ca7b-4033-abf7-06d6aae5ba56',
                seat_class_type: 'PremiumEconomy'
            },
        ]
    })

    console.log('Seeding completed for seat_classes table!');
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