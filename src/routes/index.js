const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController.js');
const passport = require('passport');
const userRegistValidator = require('../validators/userRegistValidator');
const messageRegistValidator = require('../validators/messageRegistValidoatr');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true,
    successRedirect: '/user',
  })
);

router.get('/', userController.getUser);
router.get('/user', userController.myPage);
router.get('/register', userController.register);
router.post('/signup', userRegistValidator, authController.postUser);
router.post('/logout', authController.logout);
router.get('/message', userController.message);
router.get('/messages/:id', userController.message);
router.post('/messages/:id/update', userController.updateMessage)
router.post('/message', messageRegistValidator, userController.postMessage);
router.get('/messages/:id/delete', userController.deleteMessage)
module.exports = router;
