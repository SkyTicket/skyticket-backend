function adminMiddleware (req, res, next) {
    console.log("Middleware - req.user:", req.user);

    if (!req.user) {
        return res.status(401).json({
            status: 'failed',
            message: 'unauthorized',
        })
    }

    if (req.user.user_role.toLowerCase() !== 'admin') {
        return res.status(403).json({
            status: 'failed',
            message: 'forbidden',
        })
    }

    next();
};

module.exports = adminMiddleware;