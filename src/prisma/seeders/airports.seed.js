const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create airports seeder
    await prisma.airports.createMany({
        data: [
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18',
                airport_name: 'Juanda International Airport',
                airport_code: 'SUB',
                airport_country: 'Indonesia',
                airport_city: 'Surabaya',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Surabaya.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19',
                airport_name: 'Soekarno-Hatta International Airport',
                airport_code: 'CGK',
                airport_country: 'Indonesia',
                airport_city: 'Jakarta',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Jakarta.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a20',
                airport_name: 'Halim Perdanakusuma International Airport',
                airport_code: 'HLP',
                airport_country: 'Indonesia',
                airport_city: 'Jakarta',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Jakarta.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a21',
                airport_name: 'Ngurah Rai International Airport',
                airport_code: 'DPS',
                airport_country: 'Indonesia',
                airport_city: 'Denpasar',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Denpasar.jpg',
                airport_time_zone: 'Asia/Makassar',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a22',
                airport_name: 'Kualanamu International Airport',
                airport_code: 'KNO',
                airport_country: 'Indonesia',
                airport_city: 'Medan',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Medan.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a23',
                airport_name: 'Sultan Hasanuddin International Airport',
                airport_code: 'UPG',
                airport_country: 'Indonesia',
                airport_city: 'Makassar',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Makassar.jpg',
                airport_time_zone: 'Asia/Makassar',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a24',
                airport_name: 'Adisucipto International Airport',
                airport_code: 'JOG',
                airport_country: 'Indonesia',
                airport_city: 'Yogyakarta',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Yogyakarta.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a25',
                airport_name: 'Minangkabau International Airport',
                airport_code: 'PDG',
                airport_country: 'Indonesia',
                airport_city: 'Padang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Padang.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a26',
                airport_name: 'Sam Ratulangi International Airport',
                airport_code: 'MDC',
                airport_country: 'Indonesia',
                airport_city: 'Manado',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Manado.jpg',
                airport_time_zone: 'Asia/Makassar',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a27',
                airport_name: 'Supadio Airport',
                airport_code: 'PNK',
                airport_country: 'Indonesia',
                airport_city: 'Pontianak',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Pontianak.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a28',
                airport_name: 'Hang Nadim Airport',
                airport_code: 'BTH',
                airport_country: 'Indonesia',
                airport_city: 'Batam',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Batam.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a29',
                airport_name: 'Sultan Syarif Kasim II International Airport',
                airport_code: 'PKU',
                airport_country: 'Indonesia',
                airport_city: 'Pekanbaru',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Pekanbaru.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a30',
                airport_name: 'Lombok International Airport',
                airport_code: 'LOP',
                airport_country: 'Indonesia',
                airport_city: 'Lombok',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Lombok.jpg',
                airport_time_zone: 'Asia/Makassar',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a31',
                airport_name: 'Achmad Yani International Airport',
                airport_code: 'SRG',
                airport_country: 'Indonesia',
                airport_city: 'Semarang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Semarang.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia',
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a32',
                airport_name: 'Sultan Mahmud Badaruddin II International Airport',
                airport_code: 'PLM',
                airport_country: 'Indonesia',
                airport_city: 'Palembang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Palembang.jpg',
                airport_time_zone: 'Asia/Jakarta',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a33',
                airport_name: 'El Tari Airport',
                airport_code: 'KOE',
                airport_country: 'Indonesia',
                airport_city: 'Kupang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Kupang.jpg',
                airport_time_zone: 'Asia/Makassar',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a38',
                airport_name: 'Pattimura Airport',
                airport_code: 'AMQ',
                airport_country: 'Indonesia',
                airport_city: 'Ambon',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Ambon.jpg',
                airport_time_zone: 'Asia/Jayapura',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a39',
                airport_name: 'Frans Kaisiepo Airport',
                airport_code: 'BIK',
                airport_country: 'Indonesia',
                airport_city: 'Biak',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Biak.jpg',
                airport_time_zone: 'Asia/Jayapura',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a40',
                airport_name: 'Sentani Airport',
                airport_code: 'DJJ',
                airport_country: 'Indonesia',
                airport_city: 'Jayapura',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Jayapura.jpg',
                airport_time_zone: 'Asia/Jayapura',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a41',
                airport_name: 'Sultan Babullah Airport',
                airport_code: 'TTE',
                airport_country: 'Indonesia',
                airport_city: 'Ternate',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Ternate.jpg',
                airport_time_zone: 'Asia/Jayapura',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a42',
                airport_name: 'Mopah Airport',
                airport_code: 'MKQ',
                airport_country: 'Indonesia',
                airport_city: 'Merauke',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Merauke.jpg',
                airport_time_zone: 'Asia/Jayapura',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a43',
                airport_name: 'Singapore Changi Airport',
                airport_code: 'SIN',
                airport_country: 'Singapura',
                airport_city: 'Singapura',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Singapura.jpg',
                airport_time_zone: 'Asia/Singapore',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a44',
                airport_name: 'Kuala Lumpur International Airport',
                airport_code: 'KUL',
                airport_country: 'Malaysia',
                airport_city: 'Kuala Lumpur',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Kuala_Lumpur.jpg',
                airport_time_zone: 'Asia/Kuala_Lumpur',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a45',
                airport_name: 'Suvarnabhumi Airport',
                airport_code: 'BKK',
                airport_country: 'Thailand',
                airport_city: 'Bangkok',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Bangkok.jpg',
                airport_time_zone: 'Asia/Bangkok',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a46',
                airport_name: 'Hong Kong International Airport (Chek Lap Kok Airport)',
                airport_code: 'HKG',
                airport_country: 'Hong Kong',
                airport_city: 'Hong Kong',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Hong_Kong.jpg',
                airport_time_zone: 'Asia/Hong_Kong',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a47',
                airport_name: 'Shanghai Pudong International Airport',
                airport_code: 'PVG',
                airport_country: 'Tiongkok',
                airport_city: 'Shanghai',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Shanghai.jpg',
                airport_time_zone: 'Asia/Shanghai',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a48',
                airport_name: 'Taiwan Taoyuan International Airport',
                airport_code: 'TPE',
                airport_country: 'Taiwan',
                airport_city: 'Taipei',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Taipei.jpg',
                airport_time_zone: 'Asia/Taipei',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a49',
                airport_name: 'Incheon International Airport',
                airport_code: 'ICN',
                airport_country: 'Korea Selatan',
                airport_city: 'Seoul',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Seoul.jpg',
                airport_time_zone: 'Asia/Seoul',
                airport_continent: 'Asia'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a50',
                airport_name: 'Narita International Airport',
                airport_code: 'NRT',
                airport_country: 'Jepang',
                airport_city: 'Tokyo',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Tokyo.jpg',
                airport_time_zone: 'Asia/Tokyo',
                airport_continent: 'Asia'
            },         
            {
                airport_id: 'acd832cd-d5f5-4801-9657-8c61cb888e5f',
                airport_name: 'Perth Airport',
                airport_code: 'PER',
                airport_country: 'Australia',
                airport_city: 'Perth',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Perth.jpg',
                airport_time_zone: 'Australia/Perth',
                airport_continent: 'Australia'
            }
        ]
    })

    console.log('Seeding completed for Airports table!');
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