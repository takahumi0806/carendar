const models = require('../models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');    
module.exports = {
  async registerSchedule(req, res, error) {
    const user = jwt.verify(req.user.token,'secret')
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json(errors);
    }else{
      await models.Schedules.postSchedules(req.body, user.id)
      const id = await models.Schedules.searchId(req.body, user.id)
      res.json(id);
    }
  },
  async joinSearch(req,res,error){
    const joinUser = await models.Schedules.joinSearch(req.params.id)
    res.json(joinUser[0].join)
  },
  async updateSchedule(req,res,error){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json(errors);
    }
    await models.Schedules.updateSchedule(req.params.id,req.body)
    res.json()
  },
  async deleteSchedule(req,res,error){
    await models.Schedules.deleteSchedule(req.params.id)
    res.json()
  }
};