const express = require('express');

const me = require('../controllers/me');

const router = express.Router();

router.get('/bookings', me.getBooking);

module.exports = router;
