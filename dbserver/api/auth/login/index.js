const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../../db.config');
const router = express.Router();

// const register = require("./register");

// router.get("/", register);
router.use('/login/', (req, res) => {
  const { email, password } = req.body;
  // const { username, password } = req.body;
  const sqlSelect = 'SELECT id, email, password FROM user WHERE email = ?';
  db.query(sqlSelect, email, (error, result) => {
    if (error) {
      res.send({ error });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) res.send(err);
        if (response) {
          const token = jwt.sign({ id: result[0].id }, process.env.SECRET, {
            expiresIn: process.env.EXPIRY,
          });
          res.json({ accessToken: token });
          // console.log(token);
        } else {
          res.json({
            message: 'Wrong username/password combination!',
          });
        }
      });
    } else {
      res.json({ message: "User dosen't exist!" });
    }
  });
});
module.exports = router;
