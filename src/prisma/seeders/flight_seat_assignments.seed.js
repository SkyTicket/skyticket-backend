const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create flight_seat_assignments seeder

    // GA226
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 13, // Mulai dari 13 hingga 162
            flight_seat_class_id: '3fa6e428-e124-41ac-8c53-c7e49688a956', // Economy
            available: true,
        })),
    });

    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 12 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 12
            flight_seat_class_id: 'cfe2040d-4fcd-4449-81af-afb03b4a8a8b', // Business
            available: true,
        })),
    });

    // GA227
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 13, // Mulai dari 13 hingga 162
            flight_seat_class_id: '36b8478c-6813-490d-ba48-89c92c799694', // Economy
            available: true,
        })),
    });
    
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 12 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 12
            flight_seat_class_id: 'ee24f996-2152-4f14-94c0-93f68e86b719', // Business
            available: true,
        })),
    });
    
    // JT380
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: '493794af-02ee-474d-83af-adeea376b096', // Economy
            available: true,
        })),
    });

    // JT381
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: '493794af-02ee-474d-83af-adeea376b096', // Economy
            available: true,
        })),
    });
    
    // JT387
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: 'd99b9ddb-6c3b-44c7-829e-d333367db075', // Economy
            available: true,
        })),
    });

    // ID629
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 144 }, (_, i) => ({
            seat_id: i + 13, // Mulai dari 13 hingga 156
            flight_seat_class_id: '6c8b9c49-d701-4226-8c2e-35293967c2a4', // Economy
            available: true,
        })),
    });
    
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 12 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 12
            flight_seat_class_id: '278fef08-60a5-43ae-b9b5-58fd6704f71c', // Business
            available: true,
        })),
    });
    
    // ID630
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 144 }, (_, i) => ({
            seat_id: i + 13, // Mulai dari 13 hingga 156
            flight_seat_class_id: '34ef39a4-fcf0-416b-b0cc-d317b5aa334f', // Economy
            available: true,
        })),
    });
    
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 12 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 12
            flight_seat_class_id: '819de7a1-8de3-40c1-9b68-f91372cd38d4', // Business
            available: true,
        })),
    });

    // QG465
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: '2915c987-74ee-4054-acbc-42092ff5b2ba', // Economy
            available: true,
        })),
    });
    
    // QG466
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: 'bbb250f8-850d-455c-8b4d-a6f09874a293', // Economy
            available: true,
        })),
    });
    
    // QZ805
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: '299dba8d-7558-437a-a423-d3c721551ed5', // Economy
            available: true,
        })),
    });
    
    // QZ806
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: '40c17b2c-18c7-42f2-8c32-8a20b20014dc', // Economy
            available: true,
        })),
    });

    // GA915
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 13, // Mulai dari 13 hingga 162
            flight_seat_class_id: 'a7dab73d-81db-4b10-9bc1-e63522b1e173', // Economy
            available: true,
        })),
    });

    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 12 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 12
            flight_seat_class_id: '44dbb8c4-dae7-489a-9b6a-944e70e3f8f1', // Business
            available: true,
        })),
    });
    
    // GA916
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 13, // Mulai dari 13 hingga 162
            flight_seat_class_id: '37e9f2d6-60a3-48e2-ac76-f69a5f424c41', // Economy
            available: true,
        })),
    });

    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 12 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 12
            flight_seat_class_id: 'adc14b7b-61be-4cdb-a7e8-6b108ef885ed', // Business
            available: true,
        })),
    });

    // JT111
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: '8f9bd113-21e8-48d8-a06a-2d1885965290', // Economy
            available: true,
        })),
    });
    
    // JT222
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 180 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 180
            flight_seat_class_id: 'c336dbb9-bf6c-474a-838a-f029790347a1', // Economy
            available: true,
        })),
    });
    
    // QZ534
    await prisma.flight_seat_assignments.createMany({
        data: Array.from({ length: 150 }, (_, i) => ({
            seat_id: i + 1, // Mulai dari 1 hingga 150
            flight_seat_class_id: '01f45f0a-91ac-433c-bd12-6da4f0a9a029', // Economy
            available: true,
        })),
    });

    console.log('Seeding completed for Flight_seat_assignments table!');
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