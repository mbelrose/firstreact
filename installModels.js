//this script would normally be used to migrate schemas but mongoose doesn't do that?
//probably move some of this into shared code

const mongoose = require('mongoose');
require('dotenv').config();
const reviewSchema = require('./model/reviewSchema');

const username = process.env.DATABASE_USERNAME || 'firstreact';
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || '27017';
const connectString = `mongodb://${username}:${password}@${host}:${port}/firstreact?authSource=admin`;
const connectAttempt = mongoose.connect(connectString)
connectAttempt.catch(
    (error) => {
        console.log (`Database connection failed: ${error.message}`); 
        process.exit();
    }
);
connectAttempt.then((connection) => {

    const reviews = new connection.model('reviews', reviewSchema);
    
} );
