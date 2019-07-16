const Principal = require('../models/principal'),
    authorizationCache = require('../lib/authCache');

exports.middleware = (req, res, next) => {
    let authorizedUser = req.get('x-api-key') && authorizationCache.valid(req.get('x-api-key'));
    req.session.user = (req.session.user === null) ? new Principal() : new Principal(Object.assign(req.session.user || {}, { authenticated: authorizedUser }));
    return next();
};

exports.login = (req, res, next) => {
    let key = authorizationCache.generate();
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.json({ "model": { "key": key } });
    res.end();
};

exports.logout = (req, res) => {
    authorizationCache.expire(req.get('x-api-key'));
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.json({ "message": "access token expired." });
    res.end();
};

exports.authorize = (req, res, next) => {
    if (!req.session.user.isAuthenticated()) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.status(401).json({ "message": "Unauthorized access." });
        return;
    }

    return next();
};