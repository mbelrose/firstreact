//model for reviews collection
const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');


const ReviewSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});
// const util = require('util');
// global.TextEncoder = util.TextEncoder;
// global.TextDecoder = util.TextDecoder;
const ReviewModel = mongoose.model('reviews', ReviewSchema);

const getOne = (id) => {

    const getOne = mongoose.connect(ConnectionString)
    .then( prom => {

        return ReviewModel.findById(id);

    });
    return getOne;

}

module.exports = {
    model: ReviewModel, 
    getOne,
    default: ReviewModel //deprecate this
};