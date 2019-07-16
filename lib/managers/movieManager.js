const request = require('request-promise'),
    config = require('config');

const apiBase = 'https://api.themoviedb.org/3';

exports.search = (query) => {
    return request({
            method: 'GET',
            uri: `${ apiBase }/search/movie?api_key=${ config.moviedb.apiKey }&query=${ encodeURI(query) }`,
            json: true
        }).then(body => {
            return body;
        }).catch(() => {
            throw new Error();
        });
};

exports.details = (id) => {
    return request({
            method: 'GET',
            uri: `${ apiBase }/movie/${ id }?api_key=${ config.moviedb.apiKey }`,
            json: true
        }).then(body => {
            return body;
        }).catch(() => {
            throw new Error();
        });
};