'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.User, {
        through: 'Course_Enrollment'
      })
    }
  };
  Course.init({
    instructor: DataTypes.STRING,
    course_name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT,
    rating_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};