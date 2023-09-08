const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const joinController = require('../controllers/JoinUserController');
const patternController = require('../controllers/PatternController');
const scheduleController = require('../controllers/ScheduleController');
const scheduleRegistValidator = require('../validators/scheduleRegistValidator.js');
const patternRegistValidator = require('../validators/patternRegistValidator.js');
const userRegistValidator = require('../validators/userRegistValidoatr.js');
const passport = require('passport');

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true,
    successRedirect: '/myPage',
  })
);
router.get('/myPage', userController.doGetUser);
router.get('/myCare/:id', userController.registerPattern);
router.get('/', userController.doGetUser);
router.get('/ajax/:id', userController.doGetUser);
router.get('/search', userController.search);
router.get('/register', userController.register);
router.get('/myPage/:id', userController.doGetUser);
router.get('/joinschedules/:id', scheduleController.joinSearch)
router.post('/logout', userController.logout);
router.post('/schedule/:id', scheduleRegistValidator,scheduleController.updateSchedule)
router.post('/register', userRegistValidator,userController.registerUser);
router.post('/schedule', scheduleRegistValidator,scheduleController.registerSchedule);
router.get('/schedule/:id/delete', scheduleController.deleteSchedule);
router.post('/pattern',patternRegistValidator, patternController.registerPattern)
router.post('/pattern/:id/update',patternRegistValidator, patternController.upDatePattern)
router.get('/pattern/:id/delete', patternController.deletePattern)
router.post('/join/:id', joinController.registerJoin);
router.get('/join/:id/delete', joinController.deleteJoinUser)
module.exports = router;