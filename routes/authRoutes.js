const express = require('express');
const router = express.Router();
const { googleLogin, normalLogin } = require('../controllers/authController');

router.post('/google-login', googleLogin);
router.post('/login', normalLogin);

module.exports = router;
