const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController.js');
const messageController = require('../controllers/MessageController');
const passport = require('passport');
const userRegistValidator = require('../validators/userRegistValidator');
const messageRegistValidator = require('../validators/messageRegistValidoatr');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true,
    successRedirect: '/users',
  })
);

router.get('/', userController.getUser);
router.get('/users', userController.myPage);
router.get('/register', userController.register);
router.post('/signup', userRegistValidator, authController.postUser);
router.post('/logout', authController.logout);
router.post('/messages', messageRegistValidator, messageController.postMessage);
router.get('/messages', messageController.message);
router.get('/messages/:id', messageController.message);
router.get('/messages/:id/delete', messageController.deleteMessage);
router.post('/messages/:id/update', messageController.updateMessage);
module.exports = router;
