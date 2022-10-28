const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController.js');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const userRegistValidator = require('../validators/userRegistValidator');

const con = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'post',
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

passport.serializeUser((user, done) => {
  console.log('Serialize ...');
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('Deserialize ...');
  done(null, user);
});

router.use(passport.initialize());
router.use(passport.session());

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/failure',
    successRedirect: '/success',
  })
);

passport.use(
  new LocalStrategy((mail, password, done) => {
    const sql = 'select * from users';
    con.query(sql, function (err, result, fields) {
      const currentUser = result.filter((value) => {
        return value.mail === mail;
      });
      if (currentUser.length === 0) {
        // Error
        return done(null, false);
      } else if (mail !== currentUser[0].mail) {
        // Error
        return done(null, false);
      } else if (password !== currentUser[0].password) {
        // Error
        return done(null, false);
      } else {
        // Success and return user information.
        return done(null, {
          username: currentUser[0].name,
          password: password,
          mail: mail,
        });
      }
    });
  })
);

router.get('/', userController.doGetUser);
router.post('/login', userController.doPostUser);
router.get('/success', authController.successLogin);
router.get('/board', userController.board);
router.get('/failure', authController.failureLogin);
router.get('/register', userController.registar);
router.post('/', userRegistValidator, userController.doPostUser);
router.post('/logout', userController.logout);
router.get('/post', userController.login);

module.exports = router;
