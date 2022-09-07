//model for reviews collection
const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});
const ReviewModel = mongoose.model('reviews', ReviewSchema);

module.exports = ReviewModel