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
    const messages = await Users.allMessage();
    const user = await Users.loginUser(req.user.token);
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
