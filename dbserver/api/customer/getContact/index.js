const express = require('express');
const db = require('../../../db.config');
const router = express.Router();

router.use('/getContact', async (req, res) => {
  let getAllRelatedCustomers = [];
  const { contacts } = await req.body;
  const getContacts = await JSON.parse(contacts);

  const fetchContact = await getContacts.map(contact => {
    return new Promise((resolve, reject) => {
      const getUser = 'SELECT * FROM contact WHERE _uid = ?';
      db.query(getUser, contact.userId, (error, result) => {
        if (error) console.log(error);

        if (result) {
          getAllRelatedCustomers.push(...result);
          return resolve(getAllRelatedCustomers);
        }
      });
    });
  });

  return Promise.all(fetchContact)
    .then(() => {
      return res.status(200).send(getAllRelatedCustomers);
    })
    .catch(err => {
      return res.status(500).json({
        message: 'got query error',
      });
    });
});
module.exports = router;
