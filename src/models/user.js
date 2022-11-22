'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.Messages, {
        foreignKey: 'userId',
        as: 'Messages',
      })
    } 
    static loginUser(token) {
      //ログインしているユーザーを探す
      return new Promise((resolve, reject) => {
        const user = jwt.verify(token, 'secret');
        this.findAll({ where: { mail: user.mail } }).then((user) => {
          const currentUser = user[0].dataValues;
          resolve(currentUser);
        });
      });
    }
    static postUser(user) {
      //ユーザーを作成
      return new Promise((resolve, reject) => {
        this
          .create({
            name: user.name,
            mail: user.mail,
            password: user.password,
            passwordconfirm: user.passwordconfirm,
          })
          .then(() => {
            const token = jwt.sign(
              { name: user.name, mail: user.mail, id: user.id },
              'secret'
            );
            resolve(token);
          });
      });
    }
    static uniqueMail(user) {
      //メールでユーザーを探す
      return new Promise((resolve, reject) => {
        this.findAll({ where: { mail: user } }).then((mail) => {
          resolve(mail);
        });
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      mail: DataTypes.STRING,
      password: DataTypes.STRING,
      passwordconfirm: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  
  return user;
};