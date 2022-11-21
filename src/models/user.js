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
    static loginUser(user) {
      //ログインしているユーザーを探す
      return new Promise((resolve, reject) => {
        const mail = jwt.verify(user, 'secret');
        this.findAll({ where: { mail: mail.mail } }).then((users) => {
          const user = users[0].dataValues;
          resolve(user);
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