// hopefully reusable schema object, might need separate instance client side
const mongoose = require('mongoose');

const reviewSchema = () => {
    return (
        new mongoose.Schema({
            name: String,
            rating: {
                type: Number,
                min: 1,
                max: 5
            }
        })
    );
}