const jwt = require('jsonwebtoken');

module.exports = {
  getUser(req, res, error) {
    const err = req.flash('error');
    res.render('index', {
      errorMessage: [{ msg: err[0] }],
    });
  },
  myPage: (req, res) => {
    if (!req.user) {
      res.redirect('/');
    }
    const token = req.session.passport.user.token;
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.render('mypage', { user });
    });
  },
  register: (req, res) => {
    res.render('register', {
      errorMessage: '',
    });
  },
  message: (req, res) => {
    if (!req.user) {
      res.redirect('/');
    }
    const token = req.session.passport.user.token;
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.render('message', { user });
    });
  },
};
