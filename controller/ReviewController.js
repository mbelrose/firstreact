const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const model = require('../model/ReviewModel').model;
const ControllerError = require('./ControllerError');

const getOne =  (req, res, next) => {

    mongoose.connect(ConnectionString)
    .then((prom) => { 
        
        let id;
        try {
            id = mongoose.Types.ObjectId(req.params['id']);
        } catch (err){
            throw new Error('Bad review ID.');
        }
        return model.findById(id);

    }).then( (review) => {

        if (review === null) {
            throw new Error('No reviews found.');
        }

        res.status(200).send(review);
        return review;
        next();

    }).catch((err) => ControllerError(req, res, err));
    
    
}

const getAll = (req, res, next) => { 

    mongoose.connect(ConnectionString)
    .then(( connection ) => { 

        return model.find();
        
     }).then((reviews) => { 
        
        if (reviews.length === 0) {
            throw new Error('No reviews found.');
        }

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
