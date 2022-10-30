const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController.js');
const passport = require('passport');
const userRegistValidator = require('../validators/userRegistValidator');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/failure',
    successRedirect: '/success',
  })
);

router.get('/', userController.getUser);
router.get('/success', authController.successLogin);
router.get('/board', userController.board);
router.get('/failure', authController.failureLogin);
router.get('/register', userController.registar);
router.post('/', userRegistValidator, userController.postUser);
router.post('/logout', userController.logout);
router.get('/comment', userController.myPape);
module.exports = router;
