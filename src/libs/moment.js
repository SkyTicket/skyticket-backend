const moment = require('moment');

class Moment {
    static timeDifferenceFormatted(dateTime_2, dateTime_1){
        let datetime_2 = new Date(dateTime_2).toISOString();
        let datetime_1 = new Date(dateTime_1).toISOString();
    
        datetime_2 = moment(datetime_2);
        datetime_1 = moment(datetime_1);
    
        let differenceInHour = datetime_2.diff(datetime_1, 'hours')

        let differenceInMin = datetime_2.diff(datetime_1, 'minutes')
        differenceInMin %= 60

        return `${differenceInHour}h ${differenceInMin}m`
    }

    static timeDifferenceInMin(dateTime_2, dateTime_1){
        let datetime_2 = new Date(dateTime_2).toISOString();
        let datetime_1 = new Date(dateTime_1).toISOString();
    
        datetime_2 = moment(datetime_2);
        datetime_1 = moment(datetime_1);

        let differenceInMin = datetime_2.diff(datetime_1, 'minutes')

        return differenceInMin
    }
}

module.exports = Moment;