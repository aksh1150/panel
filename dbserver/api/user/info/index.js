const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');
const router = express.Router();

router.use('/info/', (req, res) => {
  const token = req.headers['x-access-token'];

  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = getId.id;
    // console.log(userId);

    const sqlSelect = 'SELECT * FROM user WHERE id = ?';
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
