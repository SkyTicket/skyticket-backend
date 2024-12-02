const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create flights seeder
    await prisma.flights.createMany({
        data: [
            {
                flight_id: '3df97800-a11b-48b4-a2ee-f70df48ab126',
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a90ad', // Garuda
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19', // CGK
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
                flight_departure_date: '2024-12-25T00:00:00.000Z',
                flight_arrival_date: '2024-12-25T01:20:00.000Z',
                flight_number: '226'
            },
            {
                flight_id: '2e69849f-f92f-4e2e-bda9-4fa364395c6c',
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a90ad', // Garuda
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19', // CGK 
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
                flight_departure_date: '2024-12-25T01:45:00.000Z',
                flight_arrival_date: '2024-12-25T03:00:00.000Z',
                flight_number: '227'
            },
            {
                flight_id: '261e0a2d-b44c-4098-afc0-031ad36aa153',
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a95ad', // Lion
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19', // CGK
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
                flight_departure_date: '2024-12-25T01:15:00.000Z',
                flight_arrival_date: '2024-12-25T02:30:00.000Z',
                flight_number: '380'
            },
            {
                flight_id: 'a25aef3c-617e-41a9-8d08-a06ebc655ea2',
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a95ad', // Lion
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19', // CGK 
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
                flight_departure_date: '2024-12-25T03:00:00.000Z',
                flight_arrival_date: '2024-12-25T04:15:00.000Z',
                flight_number: '381'
            },
            {
              flight_id: '4c06c9c5-63f7-4293-99ba-4109594e0720',
              airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a95ad', // Lion
              flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
              flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19', // CGK
              aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
              flight_departure_date: '2024-12-25T05:25:00.000Z',
              flight_arrival_date: '2024-12-25T06:40:00.000Z',
              flight_number: '387'
            },
            {
                flight_id: 'd53f13ec-44ee-458a-821e-6189c1bbe55b',
                airline_id: 'c000cdc0-b0d5-4728-1662-8d6abc4z91h3', // Batik
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB 
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a20', // HLP
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508', // A320
                flight_departure_date: '2024-12-26T05:00:00.000Z',
                flight_arrival_date: '2024-12-26T06:15:00.000Z',
                flight_number: '629'
            },
            {
                flight_id: 'edc21a9d-bb89-4ed7-bbaa-3c26941b9e72',
                airline_id: 'c000cdc0-b0d5-4728-1662-8d6abc4z91h3', // Batik
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a20', // HLP
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB 
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508', // A320
                flight_departure_date: '2024-12-26T06:45:00.000Z',
                flight_arrival_date: '2024-12-26T08:00:00.000Z',
                flight_number: '630'
            },
            {
                flight_id: '23e730fa-0245-4aee-bdff-9edd3af0d56f',
                airline_id: 'c000cdc0-b0d5-4728-9711-8d6abc4z91h3', // Citilink
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB 
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a20', // HLP
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508', // A320
                flight_departure_date: '2024-12-26T08:00:00.000Z',
                flight_arrival_date: '2024-12-26T09:15:00.000Z',
                flight_number: '465'
            },
            {
                flight_id: 'ae791c74-22e8-4cd3-8b65-bdd28fc5ee83',
                airline_id: 'c000cdc0-b0d5-4728-9711-8d6abc4z91h3', // Citilink
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a20', // HLP
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB 
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508', // A320
                flight_departure_date: '2024-12-26T09:45:00.000Z',
                flight_arrival_date: '2024-12-26T11:00:00.000Z',
                flight_number: '466'
            },
            {
                flight_id: 'cab8393c-9464-4cc7-be25-45abc53c736d',
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4z91h3', // AirAsia
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB 
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a44', // KUL 
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508', // A320
                flight_departure_date: '2024-12-25T22:00:00.000Z',
                flight_arrival_date: '2024-12-26T00:30:00.000Z',
                flight_number: '805'
            },
            {
                flight_id: 'eaceb9c1-3cc4-4772-82cd-4f28efc36032',
                airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4z91h3', // AirAsia
                flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a44', // KUL 
                flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB 
                aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0508', // A320
                flight_departure_date: '2024-12-26T01:30:00.000Z',
                flight_arrival_date: '2024-12-26T03:00:00.000Z',
                flight_number: '806'
            },
            {
              flight_id: '6b4a721d-23bb-4245-8e0c-2ec1fb7906be',
              airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a90ad', // Garuda
              flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
              flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a43', // SIN
              aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
              flight_departure_date: '2024-12-27T03:00:00.000Z',
              flight_arrival_date: '2024-12-27T05:00:00.000Z',
              flight_number: '915'
            },
            {
              flight_id: '6f39a0ac-1707-4c68-bd5c-a2c4b98579f8',
              airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a90ad', // Garuda
              flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a43', // SIN
              flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
              aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
              flight_departure_date: '2024-12-27T07:00:00.000Z',
              flight_arrival_date: '2024-12-27T09:00:00.000Z',
              flight_number: '916'
            },
            {
              flight_id: '234a23a9-0bbb-44b5-a8a3-4f604c94b266',
              airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a95ad', // Lion
              flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
              flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a21', // DPS
              aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
              flight_departure_date: '2024-12-29T00:00:00.000Z',
              flight_arrival_date: '2024-12-29T00:50:00.000Z',
              flight_number: '111'
            },
            {
              flight_id: 'c0032936-6984-495e-9faf-938753c690e5',
              airline_id: 'c000cdc0-b0d5-4728-8616-8d6abc4a95ad', // Lion
              flight_departure_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a21', // DPS
              flight_arrival_airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18', // SUB
              aircraft_id: '8bf696ca-b0fc-4466-8fee-97f0bfcd0z81', // B738
              flight_departure_date: '2024-12-30T03:00:00.000Z',
              flight_arrival_date: '2024-12-30T03:50:00.000Z',
              flight_number: '222'
            },
        ]
    })

    console.log('Seeding completed for Flights table!');
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