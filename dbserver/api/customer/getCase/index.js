const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');

const router = express.Router();

router.use('/getCase/:id', async (req, res) => {
  const token = req.headers['x-access-token'];
  await jwt.verify(token, process.env.SECRET, async (err, getId) => {
    if (err) {
      res.send(err);
    }

    let { id } = req.params;

    const sqlSelect = 'SELECT * FROM `case` WHERE _uid = ?';
    await db.query(sqlSelect, id, (error, result) => {
      if (error) {
        res.status(401).send({ error });
      }
      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(401).send({ message: "User dosen't exist!" });
      }
    });
  });
});
module.exports = router;
