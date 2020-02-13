const express = require('express');

const booking = require('../controllers/booking');

const router = express.Router();

router.get('/calendar', booking.getCalendar);
router.post('/', booking.createBooking);

module.exports = router;
