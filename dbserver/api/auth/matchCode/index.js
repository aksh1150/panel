const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use('/matchCode/', (req, res) => {
  const { otp, getCookies } = req.body;
  bcrypt.compare(otp, getCookies, (error, response) => {
    if (error) {
      res.status(401).send(error);
    }

    res.status(200).send(response);
  });
});
module.exports = router;
