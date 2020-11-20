const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../../../db.config');

const router = express.Router();

router.use('/addCustomer/', (req, res) => {
  const {
    fname,
    lname,
    cemail,
    cphone,
    bday,
    street,
    apt,
    //  ops,
    city,
    state,
    zcode,
    advisorId,
    getCaseId,
    // cids,
    // ctypes,
  } = req.body;
  const token = advisorId.accessToken;
  // console.log('caseid:', cids);

  const contactUid = uuidv4();

  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = getId.id;

    const caseId = getCaseId ? `[${JSON.stringify(getCaseId)}]` : null;

    const sqlInsert =
      'INSERT INTO contact (advisor_id, _uid, firstname, lastname, email, phone, birth_date, address, apt, city, state, zipcode, case_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sqlInsert,
      [
        userId,
        contactUid,
        fname,
        lname,
        cemail,
        cphone,
        bday,
        // ctypes,
        //  ops,
        street,
        apt,
        city,
        state,
        zcode,
        caseId,
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
            uid: contactUid,
            message: 'You have successfully added new customer!',
          });
        }
      },
    );
  });
});

module.exports = router;
