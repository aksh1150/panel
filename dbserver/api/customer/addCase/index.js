const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/addCase/', async (req, res) => {
  const {
    caseName,
    details,
    checked,
    getCaseId,
    userId,
    refferal,
    caseStage,
    advisorId,
    newAdvisorValue,
    ifLead,
  } = req.body;
  const token = advisorId.accessToken;
  // console.log('caseid:', cids);
  jwt.verify(token, process.env.SECRET, async (err, getId) => {
    if (err) {
      res.send(err);
    }
    const newAdvisorId = newAdvisorValue || getId.id;
    const reqHelp = JSON.stringify(checked);
    const newUserId = JSON.stringify(userId);
    // console.log(reqHelp);
    const date = new Date();
    const dateCreated = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    const sqlInsert =
      'INSERT INTO `case` (_uid, req_help, referral, case_name, case_stage, date_created, case_details, if_lead, related_contacts, advisor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await db.query(
      sqlInsert,
      [
        getCaseId,
        reqHelp,
        refferal || null,
        caseName || null,
        caseStage,
        dateCreated,
        details,
        ifLead || '0',
        newUserId,
        newAdvisorId,
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
