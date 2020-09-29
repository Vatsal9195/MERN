const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/places', placesRoutes);

app.use('/api/users', userRoutes);

app.use((req, res, next) => {

    const error = new HttpError('Could not find the path', 404);
    throw error;

});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An Unknown error Occured!' })
});

mongoose.connect(
    "mongodb+srv://Vatsal:1234qwerty@clustermern.kocaf.mongodb.net/MERN?retryWrites=true&w=majority"
).then(() => {
    app.listen(5000);
}).catch(err => {
    console.log(err);
});