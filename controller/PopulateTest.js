const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const reviews = require('../model/ReviewModel').model;
const logError = require('../TestErrorLog');


const sampleReviews = [
    {
    "_id" : mongoose.Types.ObjectId("63182cc192b3f2ea552f01fd"),
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