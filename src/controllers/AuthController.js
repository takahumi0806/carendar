const jwt = require('jsonwebtoken');

module.exports = {
  successLogin: (req, res, error) => {
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
  failureLogin: (req, res) => {
    res.render('index', {
      errorMessage: [{ msg: 'パスワードかemailが違います' }],
    });
  },
};