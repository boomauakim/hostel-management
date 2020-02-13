const express = require('express');
const jwt = require('express-jwt');

const auth = require('./auth');
const hostel = require('./hostel');

const router = express.Router();

router.use('/', auth);
router.use('/hostels', jwt({ secret: process.env.SECRET_KEY }), hostel);

module.exports = router;
