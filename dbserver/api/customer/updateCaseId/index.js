const express = require('express');
const db = require('../../../db.config');
const router = express.Router();

router.use('/updateCaseId', async (req, res) => {
  const { userId, jsonCase, newAdvisorValue } = req.body;

  const caseId = JSON.stringify(jsonCase);
  const contactLists = userId;

  // Declare a new array
  let newArray = [];

  // Declare an empty object
  let uniqueObject = {};

  // Loop for the array elements
  for (let i in contactLists) {
    // Extract the title
    user = contactLists[i]['userId'];

    // Use the title as the index
    uniqueObject[user] = contactLists[i];
  }

  // Loop to push unique object into array
  for (i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  // console.log(uniqueObject);

  for (const property in uniqueObject) {
    const getUUId = uniqueObject[property].userId;
    //  const searchJson =
    //  "SELECT contact_uid, case_id FROM `contact` WHERE contact_uid = ? AND JSON_CONTAINS(case_id,'[" +
    //    caseId +
    //    "]')";

    const query = newAdvisorValue
      ? "UPDATE contact SET case_id = IF(JSON_TYPE(case_id) <=> 'ARRAY', case_id, JSON_ARRAY()), case_id = JSON_ARRAY_APPEND(case_id, '$', CAST('" +
        caseId +
        "' AS JSON)), advisor_id = " +
        newAdvisorValue +
        ' WHERE _uid = ?'
      : "UPDATE contact SET case_id = IF(JSON_TYPE(case_id) <=> 'ARRAY', case_id, JSON_ARRAY()), case_id = JSON_ARRAY_APPEND(case_id, '$', CAST('" +
        caseId +
        "' AS JSON)) WHERE _uid = ?";
    const sqlSelect = query;

    await db.query(sqlSelect, getUUId);
  }
  res.status(200).send({
    message: 'You have successfully added new contact!',
  });
});
module.exports = router;
