const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create seats seeder
    await prisma.seat.createMany({
        data: [
            { seat_number: '1A' }, { seat_number: '1B' }, { seat_number: '1C' }, { seat_number: '1D' }, { seat_number: '1E' }, { seat_number: '1F' },
            { seat_number: '2A' }, { seat_number: '2B' }, { seat_number: '2C' }, { seat_number: '2D' }, { seat_number: '2E' }, { seat_number: '2F' },
            { seat_number: '3A' }, { seat_number: '3B' }, { seat_number: '3C' }, { seat_number: '3D' }, { seat_number: '3E' }, { seat_number: '3F' },
            { seat_number: '4A' }, { seat_number: '4B' }, { seat_number: '4C' }, { seat_number: '4D' }, { seat_number: '4E' }, { seat_number: '4F' },
            { seat_number: '5A' }, { seat_number: '5B' }, { seat_number: '5C' }, { seat_number: '5D' }, { seat_number: '5E' }, { seat_number: '5F' },
            { seat_number: '6A' }, { seat_number: '6B' }, { seat_number: '6C' }, { seat_number: '6D' }, { seat_number: '6E' }, { seat_number: '6F' },
            { seat_number: '7A' }, { seat_number: '7B' }, { seat_number: '7C' }, { seat_number: '7D' }, { seat_number: '7E' }, { seat_number: '7F' },
            { seat_number: '8A' }, { seat_number: '8B' }, { seat_number: '8C' }, { seat_number: '8D' }, { seat_number: '8E' }, { seat_number: '8F' },
            { seat_number: '9A' }, { seat_number: '9B' }, { seat_number: '9C' }, { seat_number: '9D' }, { seat_number: '9E' }, { seat_number: '9F' },
            { seat_number: '10A' }, { seat_number: '10B' }, { seat_number: '10C' }, { seat_number: '10D' }, { seat_number: '10E' }, { seat_number: '10F' },
            { seat_number: '11A' }, { seat_number: '11B' }, { seat_number: '11C' }, { seat_number: '11D' }, { seat_number: '11E' }, { seat_number: '11F' },
            { seat_number: '12A' }, { seat_number: '12B' }, { seat_number: '12C' }, { seat_number: '12D' }, { seat_number: '12E' }, { seat_number: '12F' },
            { seat_number: '13A' }, { seat_number: '13B' }, { seat_number: '13C' }, { seat_number: '13D' }, { seat_number: '13E' }, { seat_number: '13F' },
            { seat_number: '14A' }, { seat_number: '14B' }, { seat_number: '14C' }, { seat_number: '14D' }, { seat_number: '14E' }, { seat_number: '14F' },
            { seat_number: '15A' }, { seat_number: '15B' }, { seat_number: '15C' }, { seat_number: '15D' }, { seat_number: '15E' }, { seat_number: '15F' },
            { seat_number: '16A' }, { seat_number: '16B' }, { seat_number: '16C' }, { seat_number: '16D' }, { seat_number: '16E' }, { seat_number: '16F' },
            { seat_number: '17A' }, { seat_number: '17B' }, { seat_number: '17C' }, { seat_number: '17D' }, { seat_number: '17E' }, { seat_number: '17F' },
            { seat_number: '18A' }, { seat_number: '18B' }, { seat_number: '18C' }, { seat_number: '18D' }, { seat_number: '18E' }, { seat_number: '18F' },
            { seat_number: '19A' }, { seat_number: '19B' }, { seat_number: '19C' }, { seat_number: '19D' }, { seat_number: '19E' }, { seat_number: '19F' },
            { seat_number: '20A' }, { seat_number: '20B' }, { seat_number: '20C' }, { seat_number: '20D' }, { seat_number: '20E' }, { seat_number: '20F' },
            { seat_number: '21A' }, { seat_number: '21B' }, { seat_number: '21C' }, { seat_number: '21D' }, { seat_number: '21E' }, { seat_number: '21F' },
            { seat_number: '22A' }, { seat_number: '22B' }, { seat_number: '22C' }, { seat_number: '22D' }, { seat_number: '22E' }, { seat_number: '22F' },
            { seat_number: '23A' }, { seat_number: '23B' }, { seat_number: '23C' }, { seat_number: '23D' }, { seat_number: '23E' }, { seat_number: '23F' },
            { seat_number: '24A' }, { seat_number: '24B' }, { seat_number: '24C' }, { seat_number: '24D' }, { seat_number: '24E' }, { seat_number: '24F' },
            { seat_number: '25A' }, { seat_number: '25B' }, { seat_number: '25C' }, { seat_number: '25D' }, { seat_number: '25E' }, { seat_number: '25F' },
            { seat_number: '26A' }, { seat_number: '26B' }, { seat_number: '26C' }, { seat_number: '26D' }, { seat_number: '26E' }, { seat_number: '26F' },
            { seat_number: '27A' }, { seat_number: '27B' }, { seat_number: '27C' }, { seat_number: '27D' }, { seat_number: '27E' }, { seat_number: '27F' },
            { seat_number: '28A' }, { seat_number: '28B' }, { seat_number: '28C' }, { seat_number: '28D' }, { seat_number: '28E' }, { seat_number: '28F' },
            { seat_number: '29A' }, { seat_number: '29B' }, { seat_number: '29C' }, { seat_number: '29D' }, { seat_number: '29E' }, { seat_number: '29F' },
            { seat_number: '30A' }, { seat_number: '30B' }, { seat_number: '30C' }, { seat_number: '30D' }, { seat_number: '30E' }, { seat_number: '30F' }
        ]
    })

    console.log('Seeding completed for Seats table!');
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