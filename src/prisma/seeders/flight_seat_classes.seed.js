const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create flight_seat_classes seeder
    await prisma.flight_seat_classes.createMany({
        data: [
            {
                flight_seat_class_id: '3fa6e428-e124-41ac-8c53-c7e49688a956',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '3df97800-a11b-48b4-a2ee-f70df48ab126', // GA226
                seat_class_price: 1500000.00,
                seat_class_capacity: 150,
            },
            {
                flight_seat_class_id: 'cfe2040d-4fcd-4449-81af-afb03b4a8a8b',
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae', // Business
                flight_id: '3df97800-a11b-48b4-a2ee-f70df48ab126', // GA226
                seat_class_price: 2500000.00,
                seat_class_capacity: 12,
            },
            {
                flight_seat_class_id: '36b8478c-6813-490d-ba48-89c92c799694',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '2e69849f-f92f-4e2e-bda9-4fa364395c6c', // GA227
                seat_class_price: 1600000.00,
                seat_class_capacity: 150,
            },
            {
                flight_seat_class_id: 'ee24f996-2152-4f14-94c0-93f68e86b719',
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae', // Business
                flight_id: '2e69849f-f92f-4e2e-bda9-4fa364395c6c', // GA227
                seat_class_price: 2600000.00,
                seat_class_capacity: 12,
            },
            {
                flight_seat_class_id: '493794af-02ee-474d-83af-adeea376b096',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '261e0a2d-b44c-4098-afc0-031ad36aa153', // JT380
                seat_class_price: 1200000.00,
                seat_class_capacity: 180,
            },
            {
                flight_seat_class_id: '5f62aa68-4cb7-439c-aae2-e71e317a6c95',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'a25aef3c-617e-41a9-8d08-a06ebc655ea2', // JT381
                seat_class_price: 1200000.00,
                seat_class_capacity: 180,
            },
            {
                flight_seat_class_id: 'd99b9ddb-6c3b-44c7-829e-d333367db075',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '4c06c9c5-63f7-4293-99ba-4109594e0720', // JT387
                seat_class_price: 1350000.00,
                seat_class_capacity: 180,
            },
            {
                flight_seat_class_id: '6c8b9c49-d701-4226-8c2e-35293967c2a4',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'd53f13ec-44ee-458a-821e-6189c1bbe55b', // ID629
                seat_class_price: 1300000.00,
                seat_class_capacity: 144,
            },
            {
                flight_seat_class_id: '278fef08-60a5-43ae-b9b5-58fd6704f71c',
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae', // Business
                flight_id: 'd53f13ec-44ee-458a-821e-6189c1bbe55b', // ID629
                seat_class_price: 2300000.00,
                seat_class_capacity: 12,
            },
            {
                flight_seat_class_id: '34ef39a4-fcf0-416b-b0cc-d317b5aa334f',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'edc21a9d-bb89-4ed7-bbaa-3c26941b9e72', // ID630
                seat_class_price: 1400000.00,
                seat_class_capacity: 144,
            },
            {
                flight_seat_class_id: '819de7a1-8de3-40c1-9b68-f91372cd38d4',
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae', // Business
                flight_id: 'edc21a9d-bb89-4ed7-bbaa-3c26941b9e72', // ID630
                seat_class_price: 2400000.00,
                seat_class_capacity: 12,
            },
            {
                flight_seat_class_id: '2915c987-74ee-4054-acbc-42092ff5b2ba',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '23e730fa-0245-4aee-bdff-9edd3af0d56f', // QG465
                seat_class_price: 1100000.00,
                seat_class_capacity: 180,
            },
            {
                flight_seat_class_id: 'bbb250f8-850d-455c-8b4d-a6f09874a293',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'ae791c74-22e8-4cd3-8b65-bdd28fc5ee83', // QG466
                seat_class_price: 1000000.00,
                seat_class_capacity: 180,
            },
            {
                flight_seat_class_id: '299dba8d-7558-437a-a423-d3c721551ed5',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'cab8393c-9464-4cc7-be25-45abc53c736d', // QZ805
                seat_class_price: 1000000.00,
                seat_class_capacity: 150,
            },
            {
                flight_seat_class_id: '40c17b2c-18c7-42f2-8c32-8a20b20014dc',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'eaceb9c1-3cc4-4772-82cd-4f28efc36032', // QZ806
                seat_class_price: 1000000.00,
                seat_class_capacity: 150,
            },
            {
                flight_seat_class_id: 'a7dab73d-81db-4b10-9bc1-e63522b1e173',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '6b4a721d-23bb-4245-8e0c-2ec1fb7906be', // GA915
                seat_class_price: 1500000.00,
                seat_class_capacity: 150,
            },
            {
                flight_seat_class_id: '44dbb8c4-dae7-489a-9b6a-944e70e3f8f1',
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae', // Business
                flight_id: '6b4a721d-23bb-4245-8e0c-2ec1fb7906be', // GA915
                seat_class_price: 2500000.00,
                seat_class_capacity: 12,
            },
            {
                flight_seat_class_id: '37e9f2d6-60a3-48e2-ac76-f69a5f424c41',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '6f39a0ac-1707-4c68-bd5c-a2c4b98579f8', // GA916
                seat_class_price: 1600000.00,
                seat_class_capacity: 150,
            },
            {
                flight_seat_class_id: 'adc14b7b-61be-4cdb-a7e8-6b108ef885ed',
                seat_class_id: '92109af1-e956-4579-b0df-2e474de789ae', // Business
                flight_id: '6f39a0ac-1707-4c68-bd5c-a2c4b98579f8', // GA916
                seat_class_price: 2600000.00,
                seat_class_capacity: 12,
            },
            {
                flight_seat_class_id: '8f9bd113-21e8-48d8-a06a-2d1885965290',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '234a23a9-0bbb-44b5-a8a3-4f604c94b266', // JT111
                seat_class_price: 1150000.00,
                seat_class_capacity: 5,
            },
            {
                flight_seat_class_id: 'c336dbb9-bf6c-474a-838a-f029790347a1',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: 'c0032936-6984-495e-9faf-938753c690e5', // JT222
                seat_class_price: 1255000.00,
                seat_class_capacity: 5,
            },
            {
                flight_seat_class_id: '01f45f0a-91ac-433c-bd12-6da4f0a9a029',
                seat_class_id: '6d1f8718-d810-4b7b-95a8-58fdff928823', // Economy
                flight_id: '6c6c7879-4515-4a83-a45c-c98184af9a4c', // QZ534
                seat_class_price: 1955000.00,
                seat_class_capacity: 150,
            },
        ]
    })

    console.log('Seeding completed for flight_seat_classes table!');
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