const httpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const uuid = require('uuid/v4');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapper in the world',
        image: 'https://www.fcbarcelona.com/fcbarcelona/photo/2018/08/24/406a0759-4719-4b5d-b3e4-6bf36632b8ef/LFGcLkki.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484,
            lng: -73.9857
        },
        creator: 'u1'
    }
]

//get place by id
const getPlacebyId = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });
    if (!place) {
        const error = new httpError('Could not find a place for the provided Id', 404);
        throw error;

    }
    res.json({ place });
};

// get place by user id
const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if (!place || places.length === 0) {
        const error = new httpError('Could not find a place for the provided User Id', 404);
        return next(error);
    }

    res.json({ places });
}

//post request to create a place
const createPlace = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new httpError('Invalid Input passed, please check your data', 422);
    }


    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({ place: createdPlace });
}

//patch request for updating the place
const updatePlace = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new httpError('Invalid Input passed, please check your data', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.pid === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(201).json({ place: updatedPlace });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new httpError('Couldn not find the place', 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    res.status(201).json({ message: 'Place Deleted' });
}

exports.getPlacebyId = getPlacebyId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlaces = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;