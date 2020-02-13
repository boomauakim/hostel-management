const express = require('express');
const jwt = require('express-jwt');

const auth = require('./auth');
const booking = require('./booking');
const hostel = require('./hostel');
const me = require('./me');

const router = express.Router();

router.use('/', auth);
router.use('/bookings', jwt({ secret: process.env.SECRET_KEY }), booking);
router.use('/hostels', jwt({ secret: process.env.SECRET_KEY }), hostel);
router.use('/me', jwt({ secret: process.env.SECRET_KEY }), me);

module.exports = router;
