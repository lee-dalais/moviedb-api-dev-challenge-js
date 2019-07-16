const express = require('express'),
    config = require('config'),
    security = require('./security'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    MongoStore = require('connect-mongo')(session),
    cookies = require('cookies'),
    server = express();

mongoose.connect(config.mongo.db);
// db events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection failed'));
db.once('open', () => { console.log('Mongo connection successful'); });
db.on('connected', () => { console.log('Mongoose default connection open'); });
db.on('disconnected', () => { console.log('Mongoose default connection disconnected'); });

// properties
server
    .set('port', config.server.port)
    .set('x-powered-by', false)
    .set('etag', false);

// external middleware
server
    .use(cookies.express())
    .use(session({
        secret: 'pssttAsecret',
        name: 'id',
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

// app middleware
server
    .use(security.middleware)
    .use((err, req, res, next) => {
        console.error(err.stack);
        return res.status(500).end();
    });

// routing
server.use('/', require('./routes'));

// error handler
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).end(JSON.stringify({
        error: err.message
    }));
});

// 404 handler
server.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).end(JSON.stringify({
        message: 'not found'
    }));
});

module.exports = server;