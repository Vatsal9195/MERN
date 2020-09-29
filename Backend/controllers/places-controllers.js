const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Place = require('../models/place');
const HttpError = require('../models/http-error');
const User = require('../models/user');

//get place by id
const getPlacebyId = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went Wrong, Try again', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find a place for the provided Id', 404);
        return next(error);
    }
    res.json({ place: place.toObject({ getters: true }) });
};

// get place by user id
const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    // let places;
    let userWithPlaces;
    try {
        // places = await Place.find({ creator: userId });
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        const error = new HttpError('Something went Wrong, Try again', 500);
        return next(error);
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        const error = new HttpError('Could not find a place for the provided User Id', 404);
        return next(error);
    }

    // res.json( place );
    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
}

//post request to create a place
const createPlace = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError('Invalid Input passed, please check your data', 422));
    }

    const { title, description, coordinate, address, creator } = req.body;
    const createdPlace = new Place({
        title,
        description,
        image: 'https://www.fcbarcelona.com/fcbarcelona/photo/2018/08/24/406a0759-4719-4b5d-b3e4-6bf36632b8ef/LFGcLkki.jpg',
        location: coordinate,
        address,
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        return next(new HttpError('Creating Place Faild, Please Try Again', 500));
    }
    console.log(user);
    if (!user) {
        return next(new HttpError('Could not find the User', 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating Place Faild, Please Try Again', 500);
        // console.log(err);
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
}

//patch request for updating the place
const updatePlace = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError('Invalid Input passed, please check your data', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not Update the Place', 500);
        return next(error);
    };

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, Could not Update the Place', 500);
        return next(error);
    };

    res.status(201).json({ place: place.toObject({ getters: true }) });
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong , Could not delete place.', 500);
        return next(error);
    }

    if (!place) {
        return next(new HttpError('Could not find the Place for this ID', 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong , Could not delete place.', 500);
        return next(error);
    }

    res.status(201).json({ message: 'Place Deleted' });
}

exports.getPlacebyId = getPlacebyId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlaces = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;