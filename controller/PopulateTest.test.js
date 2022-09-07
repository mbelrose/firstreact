const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const ReviewSchema = require('../model/ReviewSchema');
const PopulateTest = require('./PopulateTest');
const reviews = mongoose.model('reviews', ReviewSchema);

// test('executed successfully', () => { expect(true).toEqual(true)});
const logError = (error)=> {
    console.log(`Database Error: ${error.message}`);
};

const populate = PopulateTest().then(x => {

     return mongoose.connect(ConnectionString);

}).then( x => {

     return reviews.find({name: "sample"},{name: 1, rating: 1});

}).then( reviewSample => {

    test('reviews insert', () => {
        expect(reviewSample[0]["rating"]).toEqual(999);
    });
    console.log(`reviews insert manually: ${reviewSample[0]["rating"] === 3}`);
    return reviewSample;

})
.catch(logError);

test('executed successfully', () => {
    expect(true).toEqual(true);
});