const models = require('../models');
module.exports = {
  addLike(req, res){
    if (!req.user) {
      res.redirect('/');
    }
    models.MessageLikes.addlike(req.body, req.user)
  },
  deleteLike(req, res){
    if (!req.user) {
      res.redirect('/');
    }
    models.MessageLikes.deletelike(req.params.id, req.user)
  }
}