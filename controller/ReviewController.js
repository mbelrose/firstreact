const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const reviews = require('../model/ReviewModel').model;
const ControllerError = require('./ControllerError');

const getOne =  (req, res, next) => {

    const id = mongoose.Types.ObjectId(req.params['id']);
    mongoose.connect(ConnectionString)
    .then((prom) => { 

        return reviewSearch = reviews.findById(id)
     }).then( (review) => {

        res.status(200).send(review);
        return review;
        next();

    }).catch((err) => ControllerError(req, res, err));
    
    
}

const getAll = (req, res, next) => { 

    mongoose.connect(ConnectionString)
    .then(( connection ) => { 

        return reviewsSearch = reviews.find({});
        
     }).then((reviews) => { 
        
        res.status(200).send(reviews);
        return reviews;
        next();
        
    })
    .catch((err) => { ControllerError(req, res, err)});
    
    
 }

module.exports = {
    getOne,
    getAll
};
