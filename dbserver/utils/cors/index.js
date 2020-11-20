const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(
  cors({
    origin: ['http://localhost:3000', 'https://api.sendgrid.com/v3/'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  }),
);
module.exports = router;
