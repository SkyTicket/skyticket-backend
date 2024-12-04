const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // create airports seeder
    await prisma.airports.createMany({
        data: [
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a18',
                airport_name: 'Bandara Internasional Juanda',
                airport_code: 'SUB',
                airport_country: 'Indonesia',
                airport_city: 'Surabaya',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Surabaya.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a19',
                airport_name: 'Bandara Internasional Soekarno-Hatta',
                airport_code: 'CGK',
                airport_country: 'Indonesia',
                airport_city: 'Jakarta',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Jakarta.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a20',
                airport_name: 'Bandara Halim Perdanakusuma',
                airport_code: 'HLP',
                airport_country: 'Indonesia',
                airport_city: 'Jakarta',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Jakarta.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a21',
                airport_name: 'Bandara Internasional Ngurah Rai',
                airport_code: 'DPS',
                airport_country: 'Indonesia',
                airport_city: 'Denpasar',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Denpasar.jpg',
                airport_time_zone: 'Asia/Makassar'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a22',
                airport_name: 'Bandara Internasional Kualanamu',
                airport_code: 'KNO',
                airport_country: 'Indonesia',
                airport_city: 'Medan',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Medan.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a23',
                airport_name: 'Bandara Internasional Sultan Hasanuddin',
                airport_code: 'UPG',
                airport_country: 'Indonesia',
                airport_city: 'Makassar',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Makassar.jpg',
                airport_time_zone: 'Asia/Makassar'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a24',
                airport_name: 'Bandara Internasional Adisucipto',
                airport_code: 'JOG',
                airport_country: 'Indonesia',
                airport_city: 'Yogyakarta',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Yogyakarta.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a25',
                airport_name: 'Bandara Internasional Minangkabau',
                airport_code: 'PDG',
                airport_country: 'Indonesia',
                airport_city: 'Padang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Padang.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a26',
                airport_name: 'Bandara Internasional Sam Ratulangi',
                airport_code: 'MDC',
                airport_country: 'Indonesia',
                airport_city: 'Manado',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Manado.jpg',
                airport_time_zone: 'Asia/Makassar'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a27',
                airport_name: 'Bandara Internasional Supadio',
                airport_code: 'PNK',
                airport_country: 'Indonesia',
                airport_city: 'Pontianak',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Pontianak.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a28',
                airport_name: 'Bandara Internasional Hang Nadim',
                airport_code: 'BTH',
                airport_country: 'Indonesia',
                airport_city: 'Batam',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Batam.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a29',
                airport_name: 'Bandara Internasional Sultan Syarif Kasim II',
                airport_code: 'PKU',
                airport_country: 'Indonesia',
                airport_city: 'Pekanbaru',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Pekanbaru.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a30',
                airport_name: 'Bandara Internasional Zainuddin Abdul Madjid',
                airport_code: 'LOP',
                airport_country: 'Indonesia',
                airport_city: 'Lombok',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Lombok.jpg',
                airport_time_zone: 'Asia/Makassar'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a31',
                airport_name: 'Bandara Internasional Ahmad Yani',
                airport_code: 'SRG',
                airport_country: 'Indonesia',
                airport_city: 'Semarang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Semarang.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a32',
                airport_name: 'Bandara Internasional Sultan Mahmud Badaruddin II',
                airport_code: 'PLM',
                airport_country: 'Indonesia',
                airport_city: 'Palembang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Palembang.jpg',
                airport_time_zone: 'Asia/Jakarta'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a33',
                airport_name: 'Bandara Internasional El Tari',
                airport_code: 'KOE',
                airport_country: 'Indonesia',
                airport_city: 'Kupang',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Kupang.jpg',
                airport_time_zone: 'Asia/Makassar'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a38',
                airport_name: 'Bandara Internasional Pattimura',
                airport_code: 'AMQ',
                airport_country: 'Indonesia',
                airport_city: 'Ambon',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Ambon.jpg',
                airport_time_zone: 'Asia/Jayapura'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a39',
                airport_name: 'Bandara Internasional Frans Kaisiepo',
                airport_code: 'BIK',
                airport_country: 'Indonesia',
                airport_city: 'Biak',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Biak.jpg',
                airport_time_zone: 'Asia/Jayapura'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a40',
                airport_name: 'Bandara Internasional Sentani',
                airport_code: 'DJJ',
                airport_country: 'Indonesia',
                airport_city: 'Jayapura',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Jayapura.jpg',
                airport_time_zone: 'Asia/Jayapura'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a41',
                airport_name: 'Bandara Sultan Babullah',
                airport_code: 'TTE',
                airport_country: 'Indonesia',
                airport_city: 'Ternate',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Ternate.jpg',
                airport_time_zone: 'Asia/Jayapura'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a42',
                airport_name: 'Bandara Mopah',
                airport_code: 'MKQ',
                airport_country: 'Indonesia',
                airport_city: 'Merauke',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Merauke.jpg',
                airport_time_zone: 'Asia/Jayapura'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a43',
                airport_name: 'Bandara Internasional Changi',
                airport_code: 'SIN',
                airport_country: 'Singapura',
                airport_city: 'Singapura',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Singapura.jpg',
                airport_time_zone: 'Asia/Singapore'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a44',
                airport_name: 'Bandara Internasional Kuala Lumpur',
                airport_code: 'KUL',
                airport_country: 'Malaysia',
                airport_city: 'Kuala Lumpur',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Kuala_Lumpur.jpg',
                airport_time_zone: 'Asia/Kuala_Lumpur'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a45',
                airport_name: 'Bandara Suvarnabhumi',
                airport_code: 'BKK',
                airport_country: 'Thailand',
                airport_city: 'Bangkok',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Bangkok.jpg',
                airport_time_zone: 'Asia/Bangkok'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a46',
                airport_name: 'Bandara Internasional Hong Kong',
                airport_code: 'HKG',
                airport_country: 'Hong Kong',
                airport_city: 'Hong Kong',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Hong_Kong.jpg',
                airport_time_zone: 'Asia/Hong_Kong'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a47',
                airport_name: 'Bandara Internasional Pudong',
                airport_code: 'PVG',
                airport_country: 'Tiongkok',
                airport_city: 'Shanghai',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Shanghai.jpg',
                airport_time_zone: 'Asia/Shanghai'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a48',
                airport_name: 'Bandara Taoyuan',
                airport_code: 'TPE',
                airport_country: 'Taiwan',
                airport_city: 'Taipei',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Taipei.jpg',
                airport_time_zone: 'Asia/Taipei'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a49',
                airport_name: 'Bandara Internasional Incheon',
                airport_code: 'ICN',
                airport_country: 'Korea Selatan',
                airport_city: 'Seoul',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Seoul.jpg',
                airport_time_zone: 'Asia/Seoul'
            },
            {
                airport_id: 'db7af224-bac7-4d14-aec7-8874b0e32a50',
                airport_name: 'Bandara Internasional Narita',
                airport_code: 'NRT',
                airport_country: 'Jepang',
                airport_city: 'Tokyo',
                Airport_city_image: 'https://ik.imagekit.io/skyticket/city_images/Tokyo.jpg',
                airport_time_zone: 'Asia/Tokyo'
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