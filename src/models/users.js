'use strict';
const {Model,Sequelize} = require('sequelize');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static uniqueMail(mail) {
      //メールでユーザーを探す
      return new Promise((resolve, reject) => {
        console.log(mail)
        this.findAll({ where: { mail } }).then((user) => {
          resolve(user);
        });
      });
    }
    static searchName(name){
      return new Promise((resolve, reject) => {
        this.findAll({ where: { name } }).then((user) => {
          resolve(user);
        });
      });
    }
    static postUser(users) {
      //ユーザーを作成
      return new Promise((resolve, reject) => {
        this.create({
          name: users.name,
          mail: users.mail,
          password: users.password
        }).then(() => {
          this.findAll({ where: { mail: users.mail }}).then((user) => {
            const token = jwt.sign(
              {
                id: user[0].dataValues.id,
                name: user[0].dataValues.name,
                // mail: user[0].dataValuese.mail,
              },
              'secret'
            );
            resolve(token);
          });
        });
      });
    }
    static searchUser(name,user){
      return new Promise((resolve, reject) => {
        this.findAll({ where: { 
          id: {
            [Op.ne]: user.id
          },
          name:{
            [Op.like]: `%${name}%`
          }} 
        }).then(Users => { 
          resolve(Users);
        });
      });
    }
    static uniqueUser(id){
      return new Promise((resolve, reject) => {
        this.findAll({ where: { id } }).then((user) => {
          resolve(user);
        });
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};