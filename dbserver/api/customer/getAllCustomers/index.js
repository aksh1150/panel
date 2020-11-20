const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');
const router = express.Router();

router.use('/getAllCustomers', (req, res) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = getId.id;

    let id = req.params.id;
    const sqlSelect =
      'SELECT _uid, firstname, lastname, email, phone, case_id FROM contact WHERE  advisor_id = ?';
    db.query(sqlSelect, userId, (error, result) => {
      if (error) {
        res.status(401).send({ error });
      }
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(401).send({ message: "User dosen't exist!" });
      }
    });
  });
});
module.exports = router;
