const assert = require('chai').assert,
    movieManager = require('../../lib/managers/movieManager');

exports.search = (req, res, next) => {
    assert.exists(req.query.q);
    assert.isNotNull(req.query.q);
    assert.isTrue(req.query.q.length > 0);

    return movieManager.search(req.query.q)
        .then(body => {
            return res.json({ model: body });
        }).catch(next);
};

exports.movieDetails = (req, res, next) => {
    assert.exists(req.params.id);
    assert.isFalse(Number.isNaN(Number.parseInt(req.params.id)));

    return movieManager.details(req.params.id)
        .then(body => {
        return res.json({ model: body });
    }).catch(next);
};