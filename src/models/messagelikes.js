'use strict';
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async addlike(message, users){
      const user = jwt.verify(users.token, 'secret');
      this.create({
        userId: user.id,
        MessagesId: message.messageId
      })
    }
    static deletelike(message, users){
      const user = jwt.verify(users.token, 'secret');
      this.findAll({
        where: {
          [Op.and]: {
            userId: user.id,
            MessagesId: message
          }
        }
      }).then(like => {
        like[0].destroy()
      });
    }
  }
  MessageLikes.init({
    userId: DataTypes.STRING,
    MessagesId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MessageLikes',
  });
  return MessageLikes;
};