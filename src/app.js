const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const Users = require('./models/register');
const jwt = require('jsonwebtoken');


app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (mail, password, done) => {
    const currentUser = await Users.uniqueMail(mail);
    if(!currentUser.length || mail !== currentUser[0].mail ||password !== currentUser[0].password) {
      // Error
      return done(null, false, { message: 'パスワードが正しくありません。' });
    } 
    // Success and return user information.
    return done(null, {
      username: currentUser[0].name,
      password: password,
      mail: mail,
    });
  })
);

passport.serializeUser((req, user, done) => {
  done(null, user);
  req.session.passport = undefined;
  req.session.passport = { user:user };
  const token = jwt.sign(
    {
      name: req.session.passport.user.username,
      email: req.session.passport.user.mail,
    },
    'secret'
  );
  req.session.passport = { user: { token: token } };
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
