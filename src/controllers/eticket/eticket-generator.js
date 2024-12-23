require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const puppeteer = require('puppeteer');
const fs = require('fs');
const DateTimeUtils = require("../../libs/datetime");
const Mailer = require("../../libs/nodemailer");
const EticketQueries = require("./services/eticketQueries");

const {
    STAGING_SERVER_NO_SSL,
    PRODUCTION_SERVER_NO_SSL,
    NODE_ENV,
    ETICKET_PDF_PATH,
    FRONTEND_TRANSACTION_HISOTRY_URL
} = process.env

class EticketGenerator {
    static async generateEticket(eticketUrl, filename){
            try {
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    executablePath: NODE_ENV === 'staging' || NODE_ENV === 'production' ? '/usr/bin/chromium-browser' : ''
                });
        
                // Create a new page
                const page = await browser.newPage();
        
                // Open URL in current page
                await page.goto(eticketUrl, { waitUntil: 'networkidle0' });
        
                // To reflect CSS used for screens instead of print
                await page.emulateMediaType('screen');
        
                const eticketPdfPath = `${ETICKET_PDF_PATH}/${filename}.pdf`;
                // Download the PDF
                const eticketPdf = await page.pdf({
                    path: eticketPdfPath,
                    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
                    printBackground: true,
                    format: 'A4',
                });
                
                // Close the browser instance
                await browser.close();    
                
                fs.readFileSync(eticketPdfPath, (err, data) => {
                    if(err){
                        console.error("Error reading file: ", err)
                        return;
                    }
                    const eticketBase64 = data.toString('base64');
                })
            } catch (error) {
                console.error('Error occurred while generating the PDF:', error);
            }
    }

    static async SendEticket(req, res, next){
        const { bookingId } = req.params;

        try {
            const transaksi = (await EticketQueries.eticketGeneratorFindUnique(bookingId)).transaksi

            if(!transaksi){
                return res.status(404).render("error", {
                    statusCode: 404,
                    status: 'Error',
                    message: `Transaksi dengan booking_id ${bookingId} tidak ditemukan`,
                    details: 'Pastikan booking_id benar'
                })
            }

            if(transaksi.booking_payment_status !== 'Issued'){
                return res.status(403).render("eticket-trigger", {
                    transaksi: transaksi,
                    booking_payment_status: transaksi.booking_payment_status,
                    FRONTEND_TRANSACTION_HISOTRY_URL
                })
            }

            let eticketUrl = `${req.protocol}://${req.get('host')}/api/v1/transaksi/eticket/${transaksi.booking_id}`;
            if(NODE_ENV === 'staging'){
                eticketUrl = `${STAGING_SERVER_NO_SSL}/api/v1/transaksi/eticket/${transaksi.booking_id}`
            } else if (NODE_ENV === 'production'){
                eticketUrl = `${PRODUCTION_SERVER_NO_SSL}/api/v1/transaksi/eticket/${transaksi.booking_id}`
            }
            
            const departureAirportCode = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.departure_airport.airport_code
            const arrivalAirportCode = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.arrival_airport.airport_code

            const eticketFilename = `${departureAirportCode}-${arrivalAirportCode}_${transaksi.booking_code}`
            const userEmail = transaksi.user.user_email

            await EticketGenerator.generateEticket(eticketUrl, eticketFilename)

            const airlineName = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.airline.airline_name;
            const airlineCode = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.airline.airline_code;
            const flightNumber = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.flight_number;
            const departureTimezone = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.departure_airport.airport_time_zone;
            const flightDepartureDate = transaksi.tickets[0].flight_seat_assigment.flight_seat_class.flight.flight_departure_date;

            const mailOptions = {
                from: 'SkyTicket - Tim7 <no-reply@skyticket.binar>',
                to: userEmail,
                subject: `E-Ticket Anda - Konfirmasi Pemesanan SkyTicket`,
                attachments: [
                    {
                        path: `${ETICKET_PDF_PATH}/${eticketFilename}.pdf`
                    },
                ],
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2 style="color: #4CAF50;">E-Ticket Anda Telah Terbit!</h2>
                        <p>Yth. <strong>${transaksi.user.user_name}</strong>,</p>
                        <p>
                            Terima kasih telah memesan tiket melalui <strong>SkyTicket</strong>. Berikut kami lampirkan E-Ticket untuk perjalanan Anda.
                        </p>
                        <h3>Detail Pemesanan:</h3>
                        <ul>
                            <li><strong>Penerbangan:</strong> ${airlineName} | ${airlineCode}-${flightNumber}</li>
                            <li><strong>Kode Booking:</strong> ${transaksi.booking_code}</li>
                            <li><strong>Tanggal Keberangkatan:</strong> ${DateTimeUtils.formatDateTimeByTimezone(flightDepartureDate, departureTimezone)}</li>
                        </ul>
                        <p>
                            E-Ticket Anda terlampir dalam email ini sebagai dokumen PDF. Silakan unduh dan simpan untuk keperluan check-in dan boarding.
                        </p>
                        <p>
                            Jika ada pertanyaan atau membutuhkan bantuan lebih lanjut, Anda dapat menghubungi tim layanan pelanggan kami di 
                            <a href="mailto:support@skyticket.binar">support@skyticket.binar</a>.
                        </p>
                        <p>Selamat menikmati perjalanan Anda!</p>
                        <p style="color: #888; font-size: 12px;">
                            Salam hangat, <br>
                            Tim SkyTicket
                        </p>
                    </div>
                `,
            };            

            Mailer.sendEmail(mailOptions)

            await prisma.notifications.create({
                data: {
                    user_id: transaksi.user.user_id,
                    notification_type: 'TRANSACTION',
                    notification_message: "E-Ticket berhasil dikirimkan. Cek email anda sekarang!",
                    notification_is_read: false
                }
            })

            return res.render("eticket-trigger", {
                transaksi: transaksi,
                booking_payment_status: transaksi.booking_payment_status,
                FRONTEND_TRANSACTION_HISOTRY_URL
            })

        } catch(err) {
            if(err.statusCode){
                return res.status(err.statusCode).json({
                    status: 'error',
                    message: err.message
                })
            }
            next(err)
        }
    }
}

module.exports = EticketGenerator;