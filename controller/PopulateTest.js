const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const ReviewSchema = require('../model/ReviewSchema');
const { connect } = require('http2');

const logError = (error)=> {
        console.log(`Database Error: ${error.message}`);
};

const sampleReviews = [
    {
    "name": "sample",
    "rating": 3
    }
];

const PopulateTest = () => {

    const reviews = mongoose.model('reviews', ReviewSchema);
    return mongoose.connect(ConnectionString)
    .then( x => {

        return reviews.deleteMany({});

    }).then( x => {

         return reviews.insertMany(sampleReviews);

    }).catch(logError);

}

module.exports = PopulateTest;