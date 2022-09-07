const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const reviews = require('../model/ReviewModel');
const logError = require('../TestErrorLog');

const sampleReviews = [
    {
    "name": "sample",
    "rating": 3
    }
];

const PopulateTest = () => {

    return mongoose.connect(ConnectionString)
    .then( x => {

        return reviews.deleteMany({});

    }).then( x => {

         return reviews.insertMany(sampleReviews);

    }).catch(logError);

}

module.exports = PopulateTest;