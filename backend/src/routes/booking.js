const express = require('express');
const jwt = require('express-jwt');

const booking = require('../controllers/booking');

const router = express.Router();

router.get('/calendar', booking.getCalendar);
router.post(
  '/',
  jwt({ secret: process.env.SECRET_KEY }),
  booking.createBooking
);

module.exports = router;
