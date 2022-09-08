const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const reviews = require('../model/ReviewModel').model;
const ControllerError = require('./ControllerError');

const getOne =  (req, res, next) => {

    const id = mongoose.Types.ObjectId(req.params['id']);
    const connection = mongoose.connect(ConnectionString)
    .then((prom) => { 

        return reviewSearch = reviews.findById(id)
     }).then( (review) => {

        res.status(200).send(review);
        next();
        return review;
    }).catch((err) => ControllerError(req, res, err));
}

module.exports = {
    getOne
};
