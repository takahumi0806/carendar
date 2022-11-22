const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController.js');
const PostController = require('../controllers/PostController');
const passport = require('passport');
const userRegistValidator = require('../validators/userRegistValidator');
const postRegistValidator = require('../validators/postRegistValidoatr');

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
router.post('/messages', postRegistValidator, PostController.newMessage);
router.get('/messages', PostController.message);
router.get('/messages/:id', PostController.message);
router.get('/messages/:id/delete', PostController.deleteMessage);
router.post('/messages/:id/update', PostController.updateMessage);
module.exports = router;
