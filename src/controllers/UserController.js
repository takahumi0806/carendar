const models = require('../models')
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
    const messages = await models.Messages.allMessage();
    const user = await models.user.loginUser(req.user.token);
    if (!messages) {
      res.render('mypage', { user, messages: '' });
    }
    res.render('mypage', { user, messages });
  },
  register(req, res) {
    res.render('register', {
      errorMessage: '',
    });
  },
};
