const models = require('../models');
module.exports = {
  async addLike(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    await models.MessageLikes.addlike(req.body, req.user);
    const messages = await models.Messages.allMessage();
    const user = await models.user.loginUser(req.user.token);
    const likeCount = await models.Messages.likeCount();
    res.render('mypage', { user, messages, likeCount });
  },
  async deleteLike(req, res) {
    if (!req.user) {
      res.redirect('/');
    }
    await models.MessageLikes.deletelike(req.params.id, req.user);
    const messages = await models.Messages.allMessage();
    const user = await models.user.loginUser(req.user.token);
    const likeCount = await models.Messages.likeCount();
    res.render('mypage', { user, messages, likeCount });
  },
};
