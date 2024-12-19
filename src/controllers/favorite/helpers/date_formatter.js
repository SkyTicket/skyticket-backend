const DateTimeUtils = require('../../../libs/datetime');
const Luxon = require('../../../libs/luxon');

class FavDestDateFormatter {
    static formattedDate = (startDate, endDate, startDateTz, endDateTz) => {
        if(!startDate || !endDate) return null;
        const options = { day: '2-digit', month: 'long', year: 'numeric' };

        let start = new Date(startDate)
        const startDateTzOffset = Luxon.getTimezoneOffset(startDateTz)
        start = DateTimeUtils.modifyHours(start, startDateTzOffset)

        let end = new Date(endDate)
        const endDateTzOffset = Luxon.getTimezoneOffset(endDateTz)
        end = DateTimeUtils.modifyHours(end, endDateTzOffset)

        const startDateWithOptions = new Date(start).toLocaleDateString('id-ID', options);
        const endDateWithOptions = new Date(end).toLocaleDateString('id-ID', options);

        const [startDay, startMonth, startYear] = startDateWithOptions.split(' ');
        const [endDay, endMonth, endYear] = endDateWithOptions.split(' ');

        if(startMonth === endMonth && startYear === endYear) {
            return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
        }

        if(startYear === endYear) {
            return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
        }

        return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
    }
}

module.exports = FavDestDateFormatter;