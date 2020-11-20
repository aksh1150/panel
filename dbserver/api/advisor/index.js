const express = require('express');

const router = express.Router();

router.get('/getAdvisors/', require('./getAdvisors'));
router.put('/updateAdvisorId/', require('./updateAdvisorId'));

module.exports = router;
