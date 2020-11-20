const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/editCustomer/:id', async (req, res) => {
  const {
    fname,
    lname,
    cemail,
    cphone,
    bday,
    street,
    apt,
    // ops,
    city,
    state,
    zcode,
    advisorId,
    // ctypes,
  } = req.body;
  const token = advisorId.accessToken;
  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = getId.id;

    let email = req.params.id;
    const sqlSelect =
      'UPDATE contact SET firstname = ?, lastname = ?, email = ?, phone = ?, birth_date = ?, address = ?, apt = ?, city = ?, state = ?, zipcode = ? WHERE _uid = ? AND advisor_id = ?';
    db.query(
      sqlSelect,
      [
        fname,
        lname,
        cemail,
        cphone,
        bday,
        street,
        apt,
        city,
        state,
        zcode,
        email,
        userId,
      ],
      (error, result) => {
        if (error) {
          res.status(401).send({ error });
        }
        if (result) {
          res.status(200).send({
            message: 'You have successfully update information!',
          });
        } else {
          res.status(401).send({ message: "User dosen't exist!" });
        }
      },
    );
  });
});
module.exports = router;
