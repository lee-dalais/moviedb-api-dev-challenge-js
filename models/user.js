"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    userID: { type: Schema.Types.ObjectId, unique: true, auto: true },
    username: String,
    firstName: String,
    lastName: String

});

module.exports = mongoose.model('Users', schema);
