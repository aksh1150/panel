const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/updateCase/', async (req, res) => {
  const {
    caseName,
    details,
    checked,
    getCaseId,
    userId,
    caseStage,
    referance,
    advisorId,
    newAdvisorValue,
  } = req.body;
  const token = advisorId.accessToken;
  await jwt.verify(token, process.env.SECRET, async (err, getId) => {
    if (err) {
      res.send(err);
    }
    const newAdvisorId = newAdvisorValue || getId.id;
    const reqHelp = JSON.stringify(checked);
    const newUserId = JSON.stringify(userId);
    const sqlUpdate =
      'UPDATE `case` SET req_help = ?, referral = ?, case_name = ?, case_stage = ?, case_details = ?, related_contacts = ?, advisor_id = ? WHERE _uid = ?';

    await db.query(
      sqlUpdate,
      [
        reqHelp,
        referance || null,
        caseName,
        caseStage,
        details,
        newUserId,
        newAdvisorId,
        getCaseId,
      ],
      (error, result) => {
        if (error) {
          res.status(401).send({
            message:
              'Error on registration! Please carefully check each input field.',
          });
        }
        if (result) {
          res.status(200).send({
            uid: getCaseId,
            message: 'You have successfully added new contact!',
          });
        }
      },
    );
  });
});

module.exports = router;
