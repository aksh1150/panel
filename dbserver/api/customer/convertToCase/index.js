const express = require('express');
const db = require('../../../db.config');

const router = express.Router();

router.use('/convertToCase/', async (req, res) => {
  const { getCaseId } = req.body;

  const sqlUpdate = 'UPDATE `case` SET if_lead = 0 WHERE _uid = ?';

  await db.query(sqlUpdate, getCaseId, (err, result) => {
    if (err) {
      res.status(401).send({
        message: 'Error on converting to case.',
      });
    }
    if (result) {
      res.status(200).send({
        uid: getCaseId,
        message: 'You have successfully convert to case!',
      });
    }
  });
});

module.exports = router;
