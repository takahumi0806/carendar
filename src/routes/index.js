const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController.js');
const passport = require('passport');
const userRegistValidator = require('../validators/userRegistValidator');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true ,
    successRedirect: '/user',
  })
);

router.get('/', userController.getUser);
router.get('/user', userController.myPage);
router.get('/register', userController.register);
router.post('/signup', userRegistValidator, authController.postUser);
router.post('/logout', authController.logout);
router.get('/message', userController.message);
module.exports = router;
