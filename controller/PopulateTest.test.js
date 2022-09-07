const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const ReviewModel = require('../model/ReviewModel');
const reviews = ReviewModel.model;
const PopulateTest = require('./PopulateTest');
const logError = require('../TestErrorLog');

test('executed successfully', () => {
    expect(true).toEqual(true);
});

test('reviews populate', () => {
    const populate = PopulateTest().then( x => {
    
         return mongoose.connect(ConnectionString);
    
    }).then( x => {
    
         return reviews.find({name: "sample"},{name: 1, rating: 1});
    
    }).then( reviewSample => {
    
        expect(reviewSample.length).toEqual(1);
        expect(reviewSample[0]["rating"]).toEqual(3);
        return reviewSample;
    
    })
    .catch(logError);
    
});