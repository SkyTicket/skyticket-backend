require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const puppeteer = require('puppeteer');
const fs = require('fs');
const DateTimeUtils = require("../../libs/datetime");
const Mailer = require("../../libs/nodemailer");

class EticketGenerator {
    static async generateEticket(eticketUrl, filename){
            try {
                // Create a browser instance
                const browser = await puppeteer.launch();
        
                // Create a new page
                const page = await browser.newPage();
        
                // Website URL to export as PDF
                const website_url = eticketUrl;
        
                // Open URL in current page
                await page.goto(website_url, { waitUntil: 'networkidle0' });
        
                // To reflect CSS used for screens instead of print
                await page.emulateMediaType('screen');
        
                const eticketPdfPath = `public/etickets/${filename}.pdf`;
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
            const transaksi = await prisma.bookings.findUnique({
                where: {
                    booking_id: bookingId
                },
                select: {
                    booking_id: true,
                    booking_code: true,
                    booking_payment_status: true,
                    user: {
                        select: {
                            user_email: true,
                            user_name: true
                        }
                    },
                    tickets: {
                        select: {
                            flight_seat_assigment: {
                                select: {
                                    flight_seat_class: {
                                        select: {
                                            flight: {
                                                select: {
                                                    departure_airport: {
                                                        select: {
                                                            airport_code: true,
                                                            airport_time_zone: true
                                                        }
                                                    },
                                                    arrival_airport: {
                                                        select: {
                                                            airport_code: true
                                                        }
                                                    },
                                                    airline: {
                                                        select: {
                                                            airline_name: true,
                                                            airline_code: true
                                                        }
                                                    },
                                                    flight_number: true,
                                                    flight_departure_date: true
                                                }
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                }
            })

            if(transaksi.booking_payment_status !== 'Issued'){
                throw {
                    statusCode: 403,
                    message: 'Gagal mengirim E-Ticket. Pembayaran anda belum selesai atau telah dibatalkan'
                }
            }

            const eticketUrl = `${req.protocol}://${req.get('host')}/api/v1/transaksi/eticket/${transaksi.booking_id}`
            
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
                from: 'SkyTicket DJARUM 76 <no-reply@skyticket.com>',
                to: userEmail,
                subject: `E-Ticket Anda - Konfirmasi Pemesanan SkyTicket`,
                attachments: [
                    {
                        path: `public/etickets/${eticketFilename}.pdf`
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
                            <a href="mailto:support@skyticket.com">support@skyticket.com</a>.
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

            return res.json({
                status: 'success',
                message: 'E-Ticket telah berhasil dikirim ke email anda'
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