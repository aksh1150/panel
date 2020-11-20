const express = require('express');
const db = require('../../../db.config');
const router = express.Router();

router.use('/checkEmail/', (req, res) => {
  const { email } = req.body;
  const sqlInsert = 'SELECT email FROM user WHERE email = ?';
  db.query(sqlInsert, email, (err, result) => {
    if (err) res.send(err);
    if (result.length > 0) {
      res.json({
        message: 'Email already registered with us, please use another email',
        isEmail: true,
      });
    } else {
      res.json({
        message: '',
        isEmail: false,
      });
    }

    //
  });
});

module.exports = router;
