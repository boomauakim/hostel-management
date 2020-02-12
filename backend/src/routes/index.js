const express = require('express');

const hostel = require('./hostel');

const router = express.Router();

router.use('/hostels', hostel);

module.exports = router;
