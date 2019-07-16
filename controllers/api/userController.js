var User = require('../../models/user'),
    movieManager = require('../../lib/managers/movieManager'),
    chai = require('chai'),
    assert = chai.assert;

exports.listFavorites = async (req, res) => {
    let document;

    try {
        document = await User.findOne({ userID: req.params.id }).exec();
        if (!document) {
            return res.status(404).end(JSON.stringify({
                message: 'not found'
            }));
        }
    } catch (err) {
        return res.status(404).end(JSON.stringify({
            message: 'not found'
        }));
    }

    return res.json({ model: { favorites: document.favorites } });
};

exports.createFavorite = async (req, res) => {
    let document;

    try {
        assert.exists(req.body.movieID);
        assert.isNotNull(req.body.movieID);

        document = await User.findOne({ userID: req.params.id }).exec();
        if (!document) {
            return res.status(404).end(JSON.stringify({
                message: 'not found'
            }));
        }

        let movie = await movieManager.details(req.body.movieID);
        document.favorites.push({
            movieID: req.body.movieID,
            movieName: movie.title
        });
        await document.save();
    } catch (err) {

        if (err instanceof chai.AssertionError) {
            return res.status(400).end(JSON.stringify({
                message: 'bad request'
            }));
        }

        return res.status(404).end(JSON.stringify({
            message: 'not found'
        }));
    }

    return res.json({ model: document });
};

