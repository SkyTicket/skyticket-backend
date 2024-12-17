cd src
npx prisma migrate dev || echo "Migration failed"

# Seeder data (urut sesuai dependensi minimal)
echo "Seeding data..."
node prisma/seeders/airports.seed.js || echo "Airports seeder failed"
node prisma/seeders/airlines.seed.js || echo "Airlines seeder failed"
node prisma/seeders/aircrafts.seed.js || echo "Aircrafts seeder failed"
node prisma/seeders/aircraft_seats.seed.js || echo "Aircraft seats seeder failed"
node prisma/seeders/seat_classes.seed.js || echo "Seat classes seeder failed"
node prisma/seeders/flights.seed.js || echo "Flights seeder failed"