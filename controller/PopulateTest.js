const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const ReviewSchema = require('../model/ReviewSchema');

const logError = (error)=> {
        console.log(`Database Error: ${error.message}`);
};

const sampleReviews = [
    {
    "name": "sample",
    "rating": 3
    }
];

const PopulateTest = async () => {

    const connection = await mongoose.connect(ConnectionString)

    const reviews = mongoose.model('reviews', ReviewSchema);
    const deletion = await reviews.deleteMany({})

    const prom = reviews.insertMany(sampleReviews);
    return prom;

}

module.exports = PopulateTest;