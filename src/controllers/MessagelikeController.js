const models = require('../models');
module.exports = {
  async addLike(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    await models.MessageLikes.addlike(req.body, req.user);
    const messages = await models.Messages.allMessage();
    const user = await models.user.loginUser(req.user.token);
    const likes = await models.Messages.countLike();
    res.render('mypage', { user, messages, likes });
  },
  async deleteLike(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    await models.MessageLikes.deletelike(req.params.id, req.user);
    const messages = await models.Messages.allMessage();
    const user = await models.user.loginUser(req.user.token);
    const likes = await models.Messages.countLike();
    res.render('mypage', { user, messages, likes });
  },
};
