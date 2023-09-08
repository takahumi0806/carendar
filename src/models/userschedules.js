'use strict';
const {Model, Sequelize} = require('sequelize');
const Op = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {
  class userSchedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static postjoin(join,id){
      return new Promise((resolve, reject) => {
        this.create({
          Schedules: Number(join.id),
          usersId:Number(id),
        })
        .then(() => {
            resolve();
          });
      });
    }
    static deletejoinUser(schedule,user){
      this.findAll({
        where: {
          [Op.and]: {
            usersId: Number(user),
            Schedules: Number(schedule.id),
          },
        },
      }).then((user)=> {
        user[0].destroy();
      })
    }
  }
  userSchedules.init({
    usersId: DataTypes.INTEGER,
    Schedules: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userSchedules',
  });
  return userSchedules;
};