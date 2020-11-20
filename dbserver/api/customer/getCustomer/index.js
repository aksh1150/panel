const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');
const router = express.Router();

router.use('/getCustomer/:id', (req, res) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = getId.id;

    let id = req.params.id;
    const sqlSelect = 'SELECT * FROM contact WHERE _uid = ? AND advisor_id = ?';
    db.query(sqlSelect, [id, userId], (error, result) => {
      if (error) {
        res.status(401).send({ error });
      }
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(401).send({ message: "User dosen't exist!" });
      }
    });
  });
});
module.exports = router;
