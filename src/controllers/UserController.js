const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Users = require('../models/register');

module.exports = {
  doGetUser(req, res, error) {
    res.render('index', { errorMessage: '' });
  },
  async doPostUser(req, res, error) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('register', {
        errorMessage: errorsArray,
      });
    } else {
      const mail = await Users.uniqueMail(req.body);
      if (mail.length === 1) {
        res.render('register', {
          errorMessage: [
            { msg: 'すでに同じメールアドレスが登録されています。' },
          ],
        });
      } else {
        const token = await Users.postUser(req.body);
        req.session.passport = { user: { token: token } };
        jwt.verify(token, 'secret', (err, user) => {
          if (err) {
            return res.sendStatus(403);
          } else {
            res.redirect('/board');
          }
        });
      }
    }
  },
  board: (req, res) => {
    if (req.session.passport === undefined) {
      res.redirect('/');
    } else {
      const token = req.session.passport.user.token;
      jwt.verify(token, 'secret', (err, user) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          res.render('board', { user: user });
        }
      });
    }
  },
  registar: (req, res) => {
    res.render('register', {
      errorMessage: '',
    });
  },
  logout: (req, res) => {
    req.session.passport = undefined;
    res.redirect('/');
  },
  login: (req, res) => {
    if (req.session.passport === undefined) {
      res.redirect('/');
    } else {
      const token = req.session.passport.user.token;
      jwt.verify(token, 'secret', (err, user) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          res.render('post', { user: user });
        }
      });
    }
  },
};
