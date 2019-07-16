var request = require('request-promise'),
    config = require('config'),
    assert = require('chai').assert;

exports.search = function (req, res, next) {
    assert.exists(req.query.q);
    assert.isNotNull(req.query.q);
    assert.isTrue(req.query.q.length > 0);

    return request({
        method: 'GET',
        uri: `https://api.themoviedb.org/3/search/movie?api_key=${ config.moviedb.apiKey }&query=${ encodeURI(req.query.q) }`,
        json: true
    }).then(body => {
        return res.json({ model: body });
    }).catch(next);
};

exports.movieDetails = function (req, res, next) {
    assert.exists(req.params.id);
    assert.isFalse(Number.isNaN(Number.parseInt(req.params.id)));

    return request({
        method: 'GET',
        uri: `https://api.themoviedb.org/3/movie/${ req.params.id }?api_key=${ config.moviedb.apiKey }`,
        json: true
    }).then(body => {
        return res.json({ model: body });
    }).catch(next);
};