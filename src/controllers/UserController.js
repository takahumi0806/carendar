const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'post',
});

module.exports = {
  doGetUser: (req, res, error) => {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
        // console.log(results)
        // console.log(results[0])
        // console.log(results[0].name)
        res.render('index',{users:results});
      }
    );
  },
  doGetSuccess: (req, res, error) => {
    const token = jwt.sign(
      {
        name: req.session.passport.user.username,
        email: req.session.passport.user.mail,
      },
      'secret'
    );
    req.session.passport.user['token'] = token;
    res.redirect('/board');
  },
  doPostUser: (req, res, error) => {
    // console.log(req.body)
    // const username = req.body.username;
    // const password = req.body.password;
    // console.log(username)
    // console.log(password)
    
    // connection.query(
    //   'SELECT * FROM users',
    //   (error, results) => {
    //     console.log(results)
    //     console.log(results[0])
    //     console.log(results[0].name)
    //     res.render('index',{users:results});
    //   }
    // );
    console.log('OOOOOOOOOOOKLLLJKJKJ')
    res.send(req.body)
  },
  doGetBoard: (req, res) => {
    console.log(req.session.passport.user.token)
    if (req.session.passport === undefined) {
      res.redirect('/');
    } else {
      const token = req.session.passport.user.token;
      jwt.verify(token, 'secret', (err, user) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          res.render('board', { user: user });
        }
      });
    }
  },
};
