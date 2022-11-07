const jwt = require('jsonwebtoken');
const Users = require('../models/register');
const { validationResult } = require('express-validator');
module.exports = {
  async postUser(req, res, error) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('register', {
        errorMessage: errorsArray,
      });
    }
    const mail = await Users.uniqueMail(req.body.mail);
    if (mail.length === 1) {
      res.render('register', {
        errorMessage: [{ msg: 'すでに同じメールアドレスが登録されています。' }],
      });
    }
    const token = await Users.postUser(req.body);
    req.session.passport = { user: { token } };
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.redirect('/user');
    });
  },
  logout: (req, res) => {
    req.session.passport = undefined;
    res.redirect('/');
  },
};
