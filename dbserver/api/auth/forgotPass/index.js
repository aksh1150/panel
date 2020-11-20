const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const saltRounds = 10;

const sgMail = require('@sendgrid/mail');

router.use('/forgotPass/', async (req, res) => {
  const { email, PassCode } = req.body;

  await bcrypt.hash(PassCode, saltRounds, (error, hash) => {
    sgMail.setApiKey(process.env.SG_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: process.env.SG_LOGIN_EMAIL, // Use the email address or domain you verified above
      fromname: 'Caribou Team',
      templateId: process.env.SG_FORGOT_PASSWORD_TEMPLATE_ID,
      dynamic_template_data: { pass_code: PassCode },
    };
    sgMail
      .send(msg)
      .then(() => {
        if (error) {
          res.status(401).send(error);
        }
        res.status(200).send({
          encryptedPassCode: hash,
        });
      })
      .catch(err => {
        res.send(err);
      });
  });
});

module.exports = router;
