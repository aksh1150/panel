const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../../db.config');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const saltRounds = 10;

router.use('/register/', (req, res) => {
  const { password, firstName, lastName, email, phone } = req.body;

  const fname = firstName.substring(0, 3);
  const lname = lastName.substring(0, 3);
  const ph = phone.substring(6, 10);
  const adid = `${fname.toLowerCase()}-${lname.toLowerCase()}-${ph}`;
  const advisorUid = uuidv4();
  // replace(/[^a-zA-Z]/g, '')
  bcrypt.hash(password, saltRounds, (error, hash) => {
    const sqlInsert =
      'INSERT INTO user (advisor_id, firstname, lastname, email, mobile_phone, password, advisor_unique_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sqlInsert,
      [
        adid,
        firstName.replace(/[^a-zA-Z]/g, ''),
        lastName.replace(/[^a-zA-Z]/g, ''),
        email,
        phone,
        hash,
        advisorUid,
      ],
      (err, result) => {
        if (err) {
          res.status(401).send({
            message:
              'Error on registration! Please carefully check each input field.',
          });
        }
        if (result) {
          res.status(200).send({
            message: 'You have successfully registered with us!',
          });
        }
      },
    );
  });
});

module.exports = router;
