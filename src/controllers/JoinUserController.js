const models = require('../models');
const jwt = require('jsonwebtoken');
module.exports = {
  async registerJoin(req, res, error) {
    const user = jwt.verify(req.user.token,'secret')
    await models.userSchedules.postjoin(req.params,user.id)
    res.json();
  },
  async deleteJoinUser(req, res, error){
    const user = jwt.verify(req.user.token,'secret')
    await models.userSchedules.deletejoinUser(req.params,user.id)
    res.json(user);
  }
};