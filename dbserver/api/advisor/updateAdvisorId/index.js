const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/updateAdvisorId', async (req, res) => {
  const { userId, advisorId, newAdvisorValue } = req.body;

  const token = advisorId.accessToken;
  await jwt.verify(token, process.env.SECRET, async (err, getId) => {
    if (err) {
      res.send(err);
    }
    const newAdvisorId = newAdvisorValue || getId.id;
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

    for (const property in uniqueObject) {
      const getUUId = uniqueObject[property].userId;

      const query =
        'UPDATE contact SET  advisor_id = ' + newAdvisorId + ' WHERE _uid = ?';

      //  const sqlSelect = query;

      await db.query(query, getUUId, (error, success) => {
        if (error) {
          // console.log(error);
        }
      });
    }

    res.status(200).send({
      message: 'You have successfully update new contact!',
    });
  });
});
module.exports = router;
