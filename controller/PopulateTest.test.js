const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const ReviewSchema = require('../model/ReviewSchema');
const PopulateTest = require('./PopulateTest');

test('executed successfully', () => { expect(true).toEqual(true)});

const main = async () => {

    const populate = await PopulateTest();

    const connection = await mongoose.connect(ConnectionString);
        
    const reviews = mongoose.model('reviews', ReviewSchema);
    const reviewSample = await reviews.find({name: "sample"},{name: 1, rating: 1});
    let reviewRating = reviewSample[0]["rating"];
    console.log(reviewRating);

    //so jest seems to have issues with async
    test('stub2', () => {
        expect(false).toEqual(true);
    });
    test('reviews insert', () => {
        expect(reviewRating).toEqual(999);
    });
}
main();




