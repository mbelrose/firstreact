const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const ReviewSchema = require('../model/ReviewSchema');

const logError = 
    (error)=> {
        console.log(`Database Error: ${error.message}`);
    }
;

const sampleReviews = [
    {
    "name": "sample",
    "rating": 3
    }
];

const PopulateTest = () => {
    const connection = mongoose.connect(ConnectionString);
    connection.catch(logError);
    connection.then(

        (connection) => {
            const reviews = new connection.model('reviews', ReviewSchema);
            const deletion = reviews.deleteMany({})
                .catch(logError).then(
                (deletion) => {

                    const insertion = reviews.insertMany(sampleReviews)
                        .catch(logError).then(
                        (insertion) => {

                            return (insertion);

                        }
                    );

                }
            );
        }
    );
}

module.exports = PopulateTest;