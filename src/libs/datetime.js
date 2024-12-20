class DateTimeUtils {
    static modifyHours(dateTimeString, hours, hours2 = 0){
        const datetime = new Date(dateTimeString);
        datetime.setHours(datetime.getHours() + hours + hours2)
        
        return datetime;
    }

    static formatDateTimeByTimezone(dateTimeString, timezone){
        const date = new Date(dateTimeString);
        const formatter = new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
            timeZone: timezone,
        });
        let formattedDate = formatter.format(date)
        let toBeRemoved = "pukul "
        // formattedDate = formattedDate.replace(toBeRemoved, '')
        return formattedDate.replace(toBeRemoved, '')
    }

    static getDateWeekday(dateTimeString, timezone){
        const date = new Date(dateTimeString);
        const formatter = new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            timeZone: timezone,
        });
        return formatter.format(date)
    }

    static formatToID(dateTimeString, timezone){
        const date = new Date(dateTimeString);
        let formattedDate = date.toLocaleString('id-ID', {
            timeZone: timezone
        });
        return formattedDate.substring(0, formattedDate.indexOf(','))
        // return formattedDate.replace(toBeRemoved, '')
        // return formattedDate
    }

    static formatDateByTimezone(dateTimeString, timezone){
        const date = new Date(dateTimeString);
        const formatter = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'long',
            timeZone: timezone,
        });
        return formatter.format(date)
    }

    static formatHoursByTimezone(dateTimeString, timezone){
        const time = new Date(dateTimeString);
        const formatter = new Intl.DateTimeFormat('id-ID', {
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
            timeZone: timezone,
        });
        return formatter.format(time)
    }

    static convertISOStringToDate(dateTimeString){
        return new Date(dateTimeString);
    }

    static addDays(date, days) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    static formatDateForNotification(dateTimeString, timezone){
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Asia/Jakarta, Asia/Kuala_Lumpur, etc...

        const date = new Date(dateTimeString);
        const formatter = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: localTimezone,
        });
        let formattedDate = formatter.format(date)
        let toBeRemoved = " pukul"
        // formattedDate = formattedDate.replace(toBeRemoved, '')
        return formattedDate.replace(toBeRemoved, ',')
    }
}

module.exports = DateTimeUtils;