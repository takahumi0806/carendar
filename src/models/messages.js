'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.user, {
          foreignKey: 'userId', 
          targetKey: 'id'         
      })
    }
    static allMessage() {
      //メッセージとユーザーをリレーションしている
      return new Promise((resolve, reject) => {
        this.findAll({
          include: 'user' ,
        }).then((message) => {
          message.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          resolve(message);
        });
      });
    }
    static updateMsg(id, messages) {
      //メッセージをアップデートしている
      return new Promise((resolve, reject) => {
        const message = this.update(
          { title: messages.title, content: messages.content },
          { where: { id } }
        );
        console.log('OK')
        resolve(message);
      });
    }
    static createMessage(message) {
      //メッセージを作成
      return new Promise((resolve, reject) => {
        this.create({
          userId: message.userId,
          title: message.title,
          content: message.content,
        }).then(() => {
          resolve();
        });
      });
    }
    static searchMessage(id) {
      //メッセージのアップデートでidからメッセージを検索
      return new Promise((resolve, reject) => {
        this.findAll({ where: { id: id } }).then((message) => {
          const messages = message[0].dataValues;
          resolve(messages);
        });
      });
    }
  }
  Messages.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING
  }, { 
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};