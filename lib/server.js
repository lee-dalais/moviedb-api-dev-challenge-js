var express = require('express'),
    config = require('config'),
    security = require('./security'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    MongoStore = require('connect-mongo')(session),
    cookies = require('cookies'),
    server = express();

mongoose.connect(config.mongo.db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection failed'));
db.once('open', function () { console.log('Mongo connection successful'); });

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error',function (err) {
    console.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

server
    .set('port', config.server.port)
    .set('x-powered-by', false)
    .set('etag', false);

server
    .use(cookies.express())
    .use(session({
        secret: '2h3dYkwMVMyYjPyGHEoYjJzGZ',
        name: 'mid',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            useNewUrlParser: true,
            url: config.mongo.db,
            ttl: 60 * 20
        })
    }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

server
    .use(security.middleware)
    .use(function (err, req, res, next) {
        console.error(err.stack);
        return res.status(500).end();
    });

server.use('/', require('./routes'));

server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).end(JSON.stringify({
        error: err.message
    }));
});

server.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).end(JSON.stringify({
        message: 'not found'
    }));
});

module.exports = server;