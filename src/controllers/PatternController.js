const models = require('../models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');   
module.exports = {
  async registerPattern(req, res, error) {
    const errors = validationResult(req);
    const userId = jwt.verify(req.user.token,'secret')
    if(!errors.isEmpty()){
      const errorMessage=errors.array();
      const userPattern = await models.Patterns.searchUserPattern(userId.id)
      res.render('myPage', {userPattern, userId,errorMessage});
    }else{
      const user = jwt.verify(req.user.token,'secret')
      const pattern = Object.values(req.body).filter(Boolean)
      await models.Patterns.registerPattern(pattern, user)
      res.redirect('/myPage');
    }
  },
  async upDatePattern(req, res, error) {
    const errors = validationResult(req);
    const userId = jwt.verify(req.user.token,'secret')
    if(!errors.isEmpty()){
      const errorMessage=errors.array();
      const userPattern = await models.Patterns.searchUserPattern(userId.id)
      res.render('myPage', {userPattern, userId,errorMessage});
    } else {
      const pattern = Object.values(req.body).filter(Boolean)
      const id = await models.Patterns.searchUserPattern(userId.id)
      await models.Patterns.upDatePattern(pattern, userId, id)
      res.redirect('/');
    }
  },
  async deletePattern(req, res, error){
    const id = await models.Patterns.searchUserPattern(jwt.verify(req.user.token,'secret').id)
    await models.Patterns.deletePattern(id)
    res.redirect('/myPage');
  }
};