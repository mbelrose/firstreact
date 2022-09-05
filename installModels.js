//this script would normally be used to migrate schemas but mongoose doesn't do that?
//probably move some of this into shared code

const mongoose = require('mongoose');
const reviewSchema = require('./model/reviewSchema');
const connectionString = require('./model/connectionString');

const connectAttempt = mongoose.connect(connectionString);
connectAttempt.catch(
    (error) => {
        console.log (`Database connection failed: ${error.message}`); 
        process.exit();
    }
);
connectAttempt.then((connection) => {

    const reviews = new connection.model('reviews', reviewSchema);
    
} );
