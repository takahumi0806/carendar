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
      });
      user.belongsToMany(models.user, {
        through: models.MessageLikes,
        foreignKey: 'userId',
        otherKey: 'MessagesId',
        as: 'likes',
      });
    }
    static loginUser(token) {
      //ログインしているユーザーを探す
      return new Promise((resolve, reject) => {
        const user = jwt.verify(token, 'secret');
        this.findAll({ where: { mail: user.mail } }).then((users) => {
          const currentUser = users[0].dataValues;
          resolve(currentUser);
        });
      });
    }
    static postUser(users) {
      //ユーザーを作成
      return new Promise((resolve, reject) => {
        this.create({
          name: users.name,
          mail: users.mail,
          password: users.password,
          passwordconfirm: users.passwordconfirm,
        }).then(() => {
          this.findAll({ where: { mail: users.mail } }).then((user) => {
            const token = jwt.sign(
              {
                name: user[0].dataValues.name,
                mail: user[0].dataValues.mail,
                id: user[0].dataValues.id,
              },
              'secret'
            );
            resolve(token);
          });
        });
      });
    }
    static uniqueMail(mail) {
      //メールでユーザーを探す
      return new Promise((resolve, reject) => {
        this.findAll({ where: { mail } }).then((user) => {
          resolve(user);
        });
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordconfirm: DataTypes.STRING,
    },{
    sequelize,
    modelName: 'user',
  });
  return user;
};
