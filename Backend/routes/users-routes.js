const express = require('express');
const { check } = require('express-validator');

const UserController = require('../controllers/users-controllers');

const router = require('./places-routes');

router.get('/', UserController.getUsers);

router.post('/signup',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 })
    ]
    , UserController.signup);

router.post('/login', UserController.loginUser);

module.exports = router;