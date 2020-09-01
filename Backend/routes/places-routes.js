const express = require('express');
const { check } = require('express-validator');

const PlaceControllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/:pid', PlaceControllers.getPlacebyId);

router.get('/user/:uid', PlaceControllers.getPlacesByUserId);

router.post('/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    PlaceControllers.createPlaces);

router.patch('/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
    ]
    , PlaceControllers.updatePlace);

router.delete('/:pid', PlaceControllers.deletePlace);

module.exports = router;
