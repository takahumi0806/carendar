const Users = require('../models/register');
const { validationResult } = require('express-validator');
const db = require('../models/index');
module.exports = {
  async message(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    const user = await Users.loginUser(req.user.token);
    if (!req.params.id) {
      res.render('message', { user, errorMessage: '' });
    }
    const messages = await Users.searchMessage(req.params.id);
    res.render('update', { user, messages, errorMessage: '' });
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
      });
    } else {
      await Users.createMessage(req.body);
    }
    const messages = await Users.allMessage();
    res.render('mypage', { user, messages });
  },
  async updateMessage(req, res) {
    await Users.updateMsg(req.params.id, req.body)
    const messages = await Users.allMessage();
    const user = await Users.loginUser(req.user.token);
    res.render('mypage', { user, messages });
  },
  async deleteMessage(req, res) {
    await Users.deleteMsg(req.params.id)
    const messages = await Users.allMessage();
    const user = await Users.loginUser(req.user.token);
    res.render('mypage', { user, messages });
  },
}