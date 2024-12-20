const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create users seeder
    await prisma.users.createMany({
        data: [
            {
                user_id: 'e2d1ebad-4661-487b-8319-d11d960a3460',
                user_name: 'Muhammad Joni',
                user_email: 'joni@mail.com',
                user_password: '$2a$12$sI/Jz7sRYRoXOD8CzICAI.Z54UO6jltjD1ENPn8NcwcP7a4AcEBmi', // plain: password
                user_role: 'buyer',
                user_phone: '08851234567',
                user_is_active: 'verified'
            },
            {
                user_name: 'Admin',
                user_email: 'admin@skyticket.com',
                user_password: '$2a$12$m5jsOAWLsOeswLiNkjvjsuZ2LMA1cWyt0cycviL7MWJ7us7MdmwuC',
                user_role: 'admin',
                user_phone: '08851234567',
                user_is_active: 'verified'
            },
        ]
    })

    console.log('Seeding completed for Users table!');
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