const express = require('express');

const auth = require('../controllers/auth');

const router = express.Router();

router.post('/login', auth.login);
router.post('/signup', auth.signUp);

module.exports = router;
