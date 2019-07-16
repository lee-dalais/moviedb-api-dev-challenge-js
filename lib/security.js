var Principal = require('../models/principal');

exports.middleware = function (req, res, next) {
    req.session.user = (req.session.user === null) ? new Principal() : new Principal(req.session.user);
    return next();
};

exports.logout = function (req, res) {
    req.session.destroy();
};

exports.authorize = function (req, res, next) {
    if (!req.session.user.isAuthenticated()) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.status(401).json({ "message": "Unauthorized access." });
        return;
    }

    return next();
};