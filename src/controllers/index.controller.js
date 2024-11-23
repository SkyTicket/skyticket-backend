class IndexController {
    static async index(req, res, next) {
        res.json({
            status: 'success',
            message: 'It works!'
        })
    }
}

module.exports = IndexController;