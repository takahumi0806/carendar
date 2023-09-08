const models = require('../models');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
module.exports = {
  async doGetUser(req, res, error) {
    const now = new Date(); 
    const today = [now.getFullYear(),now.getMonth()+1,now.getDay(),now.getDate()]
    now.setDate(1);
    const endMonthDay = String(new Date(now.getFullYear(),now.getMonth() + 1, 0)).split(' ')[2]
    const err = req.flash('error');
    const sometime = now.getDay()
    const next = String(now).split(' ')
    if (!req.user) {
      const user =''
      const startPattren = ''
      const patterns =''
      const userId = []
      const monthSchedules= []
      const errorMessage = [{ msg: err[0] }]
      res.render('index',{today,user,next,userId,startPattren,patterns,sometime,endMonthDay,monthSchedules,errorMessage})
    } else {
      const startPattren=[]
      const userId = jwt.verify(req.user.token,'secret')
      const StartDay = await models.Patterns.searchStartDay(userId.id)
      const patterns = StartDay.filter(schedules => schedules.dataValues.pattern)
      const patternStartDay = StartDay.filter(day => day.dataValues.startDate)
      const errorMessage = ""
      if(!req.params.id || req.params.id==userId.id){
        if(patternStartDay.length){
          // const from = new Date(patternStartDay[0].dataValues.startDate);
            const startDate = patternStartDay[0].dataValues.startDate
            startPattren.push(startDate)
            // const date = new Date(`${today[0]}`, `${today[1]-1}`, 1);
            const ms = new Date(`${today[0]}`, `${today[1]-1}`, 1).getTime() - new Date(patternStartDay[0].dataValues.startDate).getTime();
            const days = Math.floor(ms / (1000*60*60*24));
            startPattren.push(days)
          }
        const userId = jwt.verify(req.user.token,'secret')
        const monthSchedules= await models.Schedules.userShedules(userId.id,today[0],today[1])
        now.setMonth(now.getMonth() + 1)
        next[7] = now.getMonth()-1
        const user = ''
        if(req.query.id){
          const nextMonth = String(req.query.id).split(',')
          const monthSchedules= await models.Schedules.userShedules(userId.id,nextMonth[0],nextMonth[1])
          res.json(monthSchedules)
        } else {
          res.render('index', {patterns,today,sometime,endMonthDay,monthSchedules,next,userId,user,startPattren,errorMessage});
        }
      }else{
        const nextMonth = String(req.query.id).split(',')
        const user = jwt.verify(req.user.token,'secret')
        const userId = await models.Users.uniqueUser(req.params.id)
        next[7] = now.getMonth()-1
        if(req.query.id && user.id !== userId.id){
          const monthSchedules= await models.Schedules.userShedules(req.params.id,nextMonth[0],nextMonth[1])
          res.json(monthSchedules)
        }else{
          const StartDay = await models.Patterns.searchStartDay(userId[0].dataValues.id)
          const patterns = StartDay.filter(schedules => schedules.dataValues.pattern)
          const patternStartDay = StartDay.filter(day => day.dataValues.startDate)
          if(patternStartDay.length){
              const startDate = patternStartDay[0].dataValues.startDate
              startPattren.push(startDate)
              const ms = new Date(`${today[0]}`, `${today[1]-1}`, 1).getTime() - new Date(patternStartDay[0].dataValues.startDate).getTime();
              const days = Math.floor(ms / (1000*60*60*24));
              startPattren.push(days)
            }
          const dayNow = Number(now.setMonth(now.getMonth() + 1))
          const monthSchedules= await models.Schedules.userShedules(req.params.id,today[0],today[1])
          res.render('index', {patterns,today,sometime,endMonthDay,monthSchedules,next,userId,user, startPattren,errorMessage});
        }
      }
    }
  },
  loginUser(req, res, error){
    res.render('login', {});
  },
  register(req, res, error){
    res.render('register', {
      errorMessage: '',
    });
  },
  async registerUser(req, res, error){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArray = errors.array();
      res.render('register', {
        errorMessage: errorsArray,
      });
    }
    const mail = await models.Users.uniqueMail(req.body.mail);
    if (mail.length === 1) {
      res.render('register', {
        errorMessage: [{ msg: 'すでに同じメールアドレスが登録されています。' }],
      });
    }
    const name = await models.Users.searchName(req.body.name);
    if (name.length === 1) {
      res.render('register', {
        errorMessage: [{ msg: 'すでに同じ名前が登録されています。' }],
      });
    }
    if(name.length === 0 && mail.length === 0 && errors.isEmpty()){
      const token = await models.Users.postUser(req.body)
      req.session.passport = { user: { token } };
      jwt.verify(token, 'secret', (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        res.redirect(`/myPage/${user.id}`);
      });
    }
  },
  logout(req, res, error){
    req.session.passport = undefined;
    res.redirect('/');
  },
  async search(req,res,error){
    const userId = jwt.verify(req.user.token,'secret')
    const searchUsers = await models.Users.searchUser(req.query.id,userId)
    res.json(searchUsers);
  },
  async registerPattern(req,res,error){
    const userId = jwt.verify(req.user.token,'secret')
    const userPattern = await models.Patterns.searchUserPattern(userId.id)
    res.render('myPage', {userPattern, userId, errorMessage:''});
  }
};
