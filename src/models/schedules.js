'use strict';
const { Model, Sequelize } = require('sequelize');
// const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedules.belongsTo(models.Users, {
        foreignKey: 'usersId',
        targetKey: 'id',
      });
      Schedules.belongsToMany(models.Users, {
        through: models.userSchedules,
        foreignKey: 'Schedules',
        otherKey: 'usersId',
        as: 'join'
      });
    }
    static userShedules(users,year,month) {
      return new Promise((resolve, reject) => {
        if(((Number(month-1))%12)+1 < 10){
          this.findAll({
            where: {
              usersId: users,
              date: {
                [Op.like]:`%${Math.floor((Number(year)+Number((month-1)/12)))}-0${((Number(month-1))%12)+1}%`
              },
            },
            include: 'join',
          }).then((schedules)=>{
            resolve(schedules);
          })
        } else {
          this.findAll({
            where: {
              usersId: users,
              date: {
                [Op.like]:`%${Math.floor((Number(year)+Number((month-1)/12)))}-${((Number(month-1))%12)+1}%`
              },
            },
            include: 'join',
          }).then((schedules)=>{
            resolve(schedules);
          })
        }
      })
    }
    static postSchedules(schedules, id){
      return new Promise((resolve, reject) => {
        this.create({
          date: schedules.date,
          usersId: id,
          content: schedules.content,
          time: schedules.time,
        })
        .then((schedule) => {
          console.log(schedule)
          resolve(schedule);
        });
      });
    }
    static searchId(schedules, id){
      return new Promise((resolve, reject) => {
        this.findAll({
          where: {
            usersId: Number(id),
            date: {
              [Op.like]: `%${schedules.date}%`
            }
          },
        }).then((scheduleId)=>{
          resolve(scheduleId);
        })
      })
    }
    static updateSchedule(id,schedule) {
      //メッセージをアップデートしている
      return new Promise((resolve, reject) => {
        const updateSchedule = this.update(
          { time: schedule.time, content: schedule.content },
          { where: { id } }
        );
        resolve(updateSchedule);
      });
    }
    static deleteSchedule(id){
      return new Promise((resolve, reject) => {
        this.findAll(
          { where: { id } }
        ).then((schedule)=>{
          schedule[0].destroy();
        })
        resolve();
      });
    }
  }
  Schedules.init({
    date: DataTypes.INTEGER,
    usersId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    time: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedules',
  });
  return Schedules;
};