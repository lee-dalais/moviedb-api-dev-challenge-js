"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const favoriteSchema = new Schema({ movieID: Number, movieName: String });
const ratingSchema = new Schema({ movieID: Number, movieName: String, rating: Number });

const schema = new Schema({
    userID: { type: Schema.Types.ObjectId, unique: true, auto: true },
    username: String,
    firstName: String,
    lastName: String,
    favorites: [favoriteSchema],
    ratings: [ratingSchema]
});

module.exports = mongoose.model('Users', schema);
