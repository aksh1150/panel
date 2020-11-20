const express = require('express');

const router = express.Router();

router.post('/register/', require('./register'));
router.post('/checkEmail/', require('./checkEmail'));
router.post('/login/', require('./login'));
router.post('/forgotPass/', require('./forgotPass'));
router.post('/matchCode/', require('./matchCode'));
router.put('/resetPassword/', require('./resetPassword'));

module.exports = router;
