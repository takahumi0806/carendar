const jwt = require('jsonwebtoken');
const Users = require('../models/register');
module.exports = {
  getUser(req, res, error) {
    const err = req.flash('error');
    res.render('index', {
      errorMessage: [{ msg: err[0] }],
    });
  },
  async myPage(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    const messages = await Users.message();
    const mail = jwt.verify(req.user.token, 'secret');
    const users = await Users.uniqueMail(mail.mail);
    const user = users[0];
    if (!messages) {
      messages = [{ title: '', content: '', user: { name: '' } }];
      res.render('mypage', { user, messages });
    }
    res.render('mypage', { user, messages });
  },
  register(req, res) {
    res.render('register', {
      errorMessage: '',
    });
  },
};