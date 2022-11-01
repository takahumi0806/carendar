const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Users = require('../models/register');
const db = require('../models/index'); 

module.exports = {
  getUser(req, res, error) {
    db.user.findAll({}).then((instances) => { 
      console.log('OK')
      console.log(instances[5].dataValues.name);
    });
    res.render('index', { errorMessage: '' });
  },
  async postUser(req, res, error) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('fillout', {
        errorMessage: errorsArray,
      });
    } else {
      const mail = await Users.uniqueMail(req.body.mail);
      if (mail.length === 1) {
        res.render('fillout', {
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
