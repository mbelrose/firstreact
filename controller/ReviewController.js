const mongoose = require('mongoose');
const ConnectionString = require('../model/ConnectionString');
const model = require('../model/ReviewModel').model;
const ControllerError = require('./ControllerError');

function getOne (req, res, next) {

    mongoose.connect(ConnectionString)
    .then((prom) => {

        let id;
        try {
            id = mongoose.Types.ObjectId(req.params['id']);
        } catch (err){
            throw new Error('Bad review ID.');
        }
        return model.findById(id).select({ _id: 0, __v: 0});

    }).then( (review) => {

        if (review === null) {
            throw new Error('No reviews found.');
        }

        res.status(200).send(review);
        return review;
        next();

    }).catch((err) => ControllerError(req, res, err));


}

function getAll (req, res, next) {

    const PAGE_SIZE = 3;
    const MAX_PAGES = 1096;

    let skip = 0;
    const page = parseInt(req.query.page) || 0;
    if (1 <= page <= MAX_PAGES ) {
        skip = (page - 1 ) * PAGE_SIZE;
    } 

    const query = {};

    mongoose.connect(ConnectionString)
    .then(( connection ) => {


        return model
            .find(query)
            .select({ _id: 1, name: 1 })
            .sort({name: "ascending"})
            .skip(skip)
            .limit(PAGE_SIZE);

    }).then((reviews) => {

        if (reviews.length === 0) {
            throw new Error('No reviews found.');
        }

        model.countDocuments(query).then( (count) => {

            res.status(200).send({
                count: count,
                PAGE_SIZE: PAGE_SIZE,
                reviews: reviews
            });
            return reviews;
            next();

        }).catch((err) => { ControllerError(req, res, err)});
    }).catch((err) => { ControllerError(req, res, err)});

}

function updateOne (req, res, next) {

    const review = req.body;
    delete review._id;
    let id;

    mongoose.connect(ConnectionString)
    .then((prom) => {

        try {
            id = mongoose.Types.ObjectId(req.params['id']);
        } catch (err){
            throw new Error('Bad review ID.');
        }

        return model.updateOne({_id: id}, review);

    }).then( (updateResult) => {

        if (! updateResult.acknowledged ) {
            throw new Error('Failed to update.');
        }

        res.status(200).send();
        return updateResult;
        next();

    }).catch((err) => ControllerError(req, res, err));

}

function insertOne (req, res, next) {

        let reviewTmp = req.body;
        delete reviewTmp._id;

        mongoose.connect(ConnectionString)
        .then( conn => {

            const reviewInsert = new model(reviewTmp);
            return reviewInsert.save();

        }).then( review => {

            res.status(200).json(review);
            return review;
            next();

        }).catch((err) => ControllerError(req, res, err));

}


module.exports = {
    getOne,
    getAll,
    updateOne,
    insertOne
};
