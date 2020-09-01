const HttpError = require('../models/http-error');

const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'p1',
        name: 'vatsal garg',
        email: 'vtslgarg77@gmail.com',
        password: 'test101'
    }
]


//get all user
const getUsers = (req, res, next) => {
    const users = DUMMY_USERS;
    res.status(201).json({ users });
}

//post request for new user
const signup = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new HttpError('Invalid Input, please enter valid input', 422);
    }

    const { name, email, password } = req.body;

    const userExist = DUMMY_USERS.find(u => u.email === email);
    if (userExist) {
        throw new HttpError('Could not Create User, Email already exist', 422);
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createdUser);

    res.status(201).json({ message: 'User Created Successfully' });
}

//post request for login user
const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        const error = new HttpError('Could not Identify the user, credentials seems to be wrong', 401);
        throw (error);
    }
    res.json({ message: 'Login...' });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.loginUser = loginUser;