//model for reviews collection
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});
const model = mongoose.model('reviews', schema);

const safeNames = Object.keys(schema.paths).filter( i => ! ['_id', '__v'].includes(i));

module.exports = {
    model,
    schema,
    safeNames,
    default: model
};