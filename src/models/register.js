require('dotenv').config();

const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const sql = 'INSERT INTO users SET ?';
const users = 'SELECT * FROM users';
const con = mysql.createConnection({
  host: process.env.MYSQL_ROOT_SERVER,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_ROOT_DATABASE,
});
module.exports = {
  uniqueMail(user) {
    return new Promise((resolve, reject) => {
      con.query(users, function (error, results, fields) {
        if (error) throw error;
        const mail = results.filter((value) => {
          return value.mail === user;
        });
        resolve(mail);
      });
    });
  },
  postUser(user) {
    return new Promise((resolve, reject) => {
      con.query(sql, user, function (err, result, fields) {
        if (err) throw err;
        const token = jwt.sign({ name: user.name, mail: user.mail }, 'secret');
        resolve(token);
      });
    });
  },
};
