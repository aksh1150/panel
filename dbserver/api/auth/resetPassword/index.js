const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../../db.config');

const router = express.Router();
const saltRounds = 10;

router.use('/resetPassword/', (req, res) => {
  const { password, getEmail } = req.body;

  bcrypt.hash(password, saltRounds, (error, hash) => {
    const sqlUpdate = 'UPDATE user SET password = ? WHERE email = ?';
    db.query(sqlUpdate, [hash, getEmail], (err, result) => {
      if (err) {
        res.status(401).send({
          message: 'Error on reset password. Please try again or contact us.',
        });
      }
      if (result) {
        res.status(200).send({
          message: true,
        });
      }
    });
  });
});

module.exports = router;
