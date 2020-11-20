const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/showLeads/:id', (req, res) => {
  const token = req.headers['x-access-token'];

  jwt.verify(token, process.env.SECRET, (err, getId) => {
    if (err) {
      res.send(err);
    }
    const userId = getId.id;
    let { id } = req.params;

    const query =
      id === 'all'
        ? 'SELECT _uid, referral, case_name, case_stage, date_created FROM `case` WHERE if_lead = 1'
        : 'SELECT _uid, referral, case_name, case_stage, date_created FROM `case` WHERE advisor_id = ? AND if_lead = 1';

    const sqlSelect = query;
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
