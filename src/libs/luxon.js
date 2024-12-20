const luxon = require('luxon');

class Luxon {
    static getTimezoneOffset(timezone){
        let timezoneOffset = luxon.DateTime.local().setZone(timezone).offset // in minutes
        return timezoneOffset /= 60 // divide by 60 to convert in hour(s)
    }
}

module.exports = Luxon;