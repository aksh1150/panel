const express = require('express');
const router = express.Router();
const session = require('express-session');
router.use(
  session({
    key: 'userId',
    secret: 'yoursecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24,
    },
  }),
);
module.exports = router;
