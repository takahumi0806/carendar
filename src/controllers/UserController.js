const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'post',
});

module.exports = {
  doGetUser: (req, res, error) => {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
        res.render('index',{errorMessage: ''});
      }
    );
  },
  doGetSuccess: (req, res, error) => {
    const token = jwt.sign(
      {
        name: req.session.passport.user.username,
        email: req.session.passport.user.mail,
      },
      'secret'
    );
    req.session.passport.user['token'] = token;
    res.redirect('/board');
  },
  doPostUser: (req, res, error) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('register', {
        errorMessage: errorsArray,
      });
    }else{


      const mysql = 'select * from users';
      connection.query(mysql, function (err, result, fields) {
        const mail = result.filter((value) => {
          return value.mail === req.body.mail;
        });
        if (mail.length === 1) {
          res.render('register', {
            errorMessage: [
              { msg: 'すでに同じメールアドレスが登録されています。' },
            ],
          });
        } else {
          const sql = 'INSERT INTO users SET ?';
          connection.query(sql, req.body, function (err, result, fields) {
            if (err) throw err;
            const token = jwt.sign(
              { name: req.body.name, mail: req.body.mail },
              'secret'
            );
            req.session.passport = { user: { token: token } };
            jwt.verify(token, 'secret', (err, user) => {
              if (err) {
                return res.sendStatus(403);
              } else {
                res.redirect('/board');
              }
            });
          });
        }
      });
    }
  },
  doGetBoard: (req, res) => {
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
  doGetFailure: (req, res) => {
    res.render('index', {
      errorMessage: [{ msg: 'パスワードかemailが違います' }],
    });
  },
  doGetRegistar: (req, res) => {
    res.render('register', {
      errorMessage: '',
    });
  },
  doPostLogout: (req, res) => {
    req.session.passport = undefined;
    res.redirect('/');
  },
  doGetLogin: (req, res) => {
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
