const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/getAdvisors/', (req, res) => {
  const token = req.headers['x-access-token'];

  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = 1;

    const sqlSelect =
      'SELECT id, firstname, lastname, mobile_phone FROM user WHERE user_role_id = ?';
    db.query(sqlSelect, userId, (error, result) => {
      if (error) {
        res.send({ error });
      }
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "User dosen't exist!" });
      }
    });
  });
});
module.exports = router;
