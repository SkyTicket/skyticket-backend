class ErrorHandler {
    static passengersTotalValidation(totalNoInfant, infantPassengersTotal, adultPassengersTotal){
        if(totalNoInfant > 7){
            throw {
                statusCode: 400,
                message: {
                    line_1: 'Maksimal 7 penumpang (dewasa dan anak-anak)',
                }
            }
        } else if(infantPassengersTotal > adultPassengersTotal){
            throw {
                statusCode: 400,
                message: {
                    line_1: 'Jumlah penumpang bayi tidak boleh melebihi jumlah penumpang dewasa',
                }
            }
        } else if(adultPassengersTotal === 0) {
            throw {
                statusCode: 400,
                message: {
                    line_1: 'Minimal 1 penumpang dewasa',
                }
            }
        }
    }

    static ifNoFlightsFound(flights){
        if(typeof flights !== 'undefined' && flights.length === 0){
            throw {
                statusCode: 404,
                message: {
                    line_1: 'Maaf, pencarian Anda tidak ditemukan',
                    line_2: 'Coba cari perjalanan lainnya!'
                }
            }
        }
    }

    static ifNoReturningDateInRoundTrip(returning_flight_departure_date){
        if(!returning_flight_departure_date){ // if no returning flight date provided
            throw {
                statusCode: 400,
                message: {
                    line_1: 'Tanggal penerbangan pulang belum diisi',
                    line_2: 'Mohon isi tanggal penerbangan pulang'
                }
            }
        }
    }

    static ifAllFlightsAreFull(filteredFlightsStatus){
        const allFlightsAreFull = (flightsStatus) => {
            if (flightsStatus.length === 0 || !flightsStatus.every(value => value === true)) {
                return false;
            }
            return true;
        };

        if(allFlightsAreFull(filteredFlightsStatus)){
            throw {
                statusCode: 422,
                message: {
                    line_1: 'Maaf, Tiket terjual habis!',
                    line_2: 'Coba cari perjalanan lainnya!'
                }
            }
        }
    }
}

module.exports = ErrorHandler;