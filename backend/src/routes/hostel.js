const express = require('express');

const hostel = require('../controllers/hostel');

const router = express.Router();

router.get('/', hostel.getAllHostel);
router.get('/search', hostel.searchHotel);
router.get('/:roomId', hostel.getHostel);
router.post('/', hostel.createHostel);

module.exports = router;
