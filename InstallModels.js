//this script would normally be used to migrate schemas but mongoose doesn't do that.

const mongoose = require('mongoose');
const reviews = require('./model/ReviewSchema');
const ConnectionString = require('./model/ConnectionString');

const logError = (error) => {
    console.log(`Database Error: ${error.message}`);
    process.exit();
};


const connection = mongoose.connect(ConnectionString)
.then( x => {

    console.log('Success.');
    process.exit();
    
}).catch(logError);
