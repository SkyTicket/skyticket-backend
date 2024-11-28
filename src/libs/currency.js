class Currency {
    static format(amount){
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        })

        let formattedAmount = formatter.format(amount)
        let toBeRemoved = "Rp"
        // formattedAmount = formattedAmount.replace(toBeRemoved, '')
        return formattedAmount.replace(toBeRemoved, 'IDR')
        // return formatter.format(amount)
    }
}

module.exports = Currency;