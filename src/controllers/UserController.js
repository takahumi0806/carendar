const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Users = require('../models/register');

module.exports = {
  getUser(req, res, error) {
    res.render('index', { errorMessage: '' });
  },
  async postUser(req, res, error) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('fillout', {
        errorMessage: errorsArray,
      });
    }
    const mail = await Users.uniqueMail(req.body.mail);
    if (mail.length === 1) {
      res.render('fillout', {
        errorMessage: [{ msg: 'すでに同じメールアドレスが登録されています。' }],
      });
    }
    const token = await Users.postUser(req.body);
    req.session.passport = { user: { token: token } };
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.redirect('/board');
    });
  },
  board: (req, res) => {
    if (req.session.passport === undefined) {
      res.redirect('/');
    }
    const token = req.session.passport.user.token;
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.render('board', { user: user });
    });
  },
  fillout: (req, res) => {
    res.render('fillout', {
      errorMessage: '',
    });
  },
  logout: (req, res) => {
    req.session.passport = undefined;
    res.redirect('/');
  },
  myPape: (req, res) => {
    if (req.session.passport === undefined) {
      res.redirect('/');
    }
    const token = req.session.passport.user.token;
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.render('post', { user: user });
    });
  },
};
