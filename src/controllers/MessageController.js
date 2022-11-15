const Users = require('../models/register');
const { validationResult } = require('express-validator');
const db = require('../models/index');
const jwt = require('jsonwebtoken');
module.exports = {
  async message(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    const mail = jwt.verify(req.user.token, 'secret');
    const users = await Users.uniqueMail(mail.mail);
    const user = users[0];
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
    const mail = jwt.verify(req.user.token, 'secret');
    const users = await Users.uniqueMail(mail.mail);
    const user = users[0];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('message', {
        errorMessage: errorsArray,
        user,
      });
      await Users.createMessage(req.body);
    }
    const messages = await Users.message();
    res.render('mypage', { user, messages });
  },
  async updateMessage(req, res) {
    const id = req.params.id;
    await db.Messages.update(
      { title: req.body.title, content: req.body.content },
      { where: { id } }
    );
    const messages = await Users.message();
    const mail = jwt.verify(req.user.token, 'secret');
    const users = await Users.uniqueMail(mail.mail);
    const user = users[0];
    res.render('mypage', { user, messages });
  },
  async deleteMessage(req, res) {
    await db.Messages.findOne({
      where: { id: req.params.id },
    }).then((user) => {
      user.destroy();
    });
    const messages = await Users.message();
    const mail = jwt.verify(req.user.token, 'secret');
    const users = await Users.uniqueMail(mail.mail);
    const user = users[0];
    res.render('mypage', { user, messages });
  },
}