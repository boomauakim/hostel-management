const express = require('express');

const hostel = require('../controllers/hostel');

const router = express.Router();

router.get('/', hostel.getAllHostel);
router.get('/available', hostel.getHostelAvailable);
router.get('/search', hostel.searchHotel);
router.get('/:id', hostel.getHostel);
router.post('/', hostel.createHostel);

module.exports = router;
