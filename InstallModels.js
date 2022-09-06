//this script would normally be used to migrate schemas but mongoose doesn't do that?
//probably move some of this into shared code

const mongoose = require('mongoose');
const ReviewSchema = require('./model/ReviewSchema');
const ConnectionString = require('./model/ConnectionString');

const logError = (error) => {
    console.log(`Database Error: ${error.message}`);
    process.exit();
};


const connection = mongoose.connect(ConnectionString)
    .then(
    (connection) => {

    const reviews = mongoose.model('reviews', ReviewSchema);
    console.log('Success.');
    process.exit();
    
}).catch(logError);
