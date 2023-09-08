'use strict';
const { Model } = require('sequelize');
const { search } = require('../controllers/UserController');
module.exports = (sequelize, DataTypes) => {
  class Patterns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static searchUserPattern(id){
      return new Promise((resolve, reject) => {
        this.findAll({
          where: { usersId: id },
        }).then((pattern)=>{
          resolve(pattern);
        })
      })
    }
    static searchStartDay(id){
      return new Promise((resolve, reject) => {
        this.findAll({
          where: {
            usersId: Number(id),
          },
        }).then((pattern)=>{
          resolve(pattern);
        })
      });
    }
    static registerPattern(pattern, user) {
      const  patternValue = pattern.splice( 0, 1 )
      return new Promise((resolve, reject) => {
        this.create({
          startDate: patternValue[0],
          usersId: user.id,
          pattern: pattern.join()
        })
        .then(() => {
            resolve();
          });
      });
    }
    static upDatePattern(pattern, user, id){
      const  patternValue = pattern.splice( 0, 1 )
      return new Promise((resolve, reject) => {
        this.update(
          { startDate: patternValue[0],  usersId: user.id, pattern: pattern.join()},
          { where: { id: id[0].dataValues.id} }
        ).then((users) => {
          resolve(users);
        });
      });
    }
    static deletePattern(id){
      return new Promise((resolve, reject) => {
        this.findAll(
          {where: {id:id[0].dataValues.id}}
        ).then((schedule)=>{
          schedule[0].destroy();
        })
        resolve();
      });
    }
  }
  Patterns.init({
    pattern: DataTypes.STRING,
    startDate: DataTypes.INTEGER,
    usersId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patterns',
  });
  return Patterns;
};