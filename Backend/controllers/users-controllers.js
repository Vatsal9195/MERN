const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');
const User = require('../models/user');

//get all user
const getUsers = async (req, res, next) => {

    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        return next(new HttpError('something went wrong, try agian', 500));
    }

    res.status(201).json({ users: users.map(user => user.toObject({ getter: true })) });
}

//post request for new user
const signup = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError('Invalid Input, please enter valid EmailID or Password', 422));
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Could not Create new User, Please try again later', 500));
    }

    if (existingUser) {
        return next(new HttpError('User already exists, Login instead', 422));
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: 'https://www.fcbarcelona.com/fcbarcelona/photo/2018/08/24/406a0759-4719-4b5d-b3e4-6bf36632b8ef/LFGcLkki.jpg',
        places: [],
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(new HttpError('Signing Up failed, please try again later', 500));
    }

    res.status(201).json({ message: 'User Created Successfully'});
}

//post request for login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('loggin Failed, Please try again later', 500));
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Invalid Credentials, Try again', 422))
    }

    res.json({ message: 'Login successfull' });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.loginUser = loginUser;