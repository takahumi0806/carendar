const Users = require('../models/register');
const { validationResult } = require('express-validator');
module.exports = {
  async message(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    const user = await Users.loginUser(req.user.token);
    if (!req.params.id) {
      res.render('message', { user, messages: '', errorMessage: '' });
    }
    const messages = await Users.searchMessage(req.params.id);
    res.render('message', { user, messages, errorMessage: '' });
  },
  async postMessage(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    const user = await Users.loginUser(req.user.token);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('message', {
        errorMessage: errorsArray,
        user,
        messages: '',
      });
    } else {
      await Users.createMessage(req.body);
    }
    const messages = await Users.allMessage();
    res.render('mypage', { user, messages });
  },
  async updateMessage(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    await Users.updateMsg(req.params.id, req.body);
    const messages = await Users.allMessage();
    const user = await Users.loginUser(req.user.token);
    res.render('mypage', { user, messages });
  },
  async deleteMessage(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    await Users.deleteMsg(req.params.id);
    const messages = await Users.allMessage();
    const user = await Users.loginUser(req.user.token);
    res.render('mypage', { user, messages });
  },
};
