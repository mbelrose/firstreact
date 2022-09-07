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
const model = mongoose.model('reviews', ReviewSchema);

const getOne = (id) => {

    const getOne = mongoose.connect(ConnectionString)
    .then( prom => {

        return model.findById(id);

    });
    return getOne;

}

module.exports = {
    model, 
    getOne
};