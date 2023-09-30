'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentGrades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentGrades.init({
    idUnit: DataTypes.UUID,
    idAcademicYear: DataTypes.UUID,
    idClassroom: DataTypes.UUID,
    idLessonSchedule: DataTypes.UUID,
    idEmployee: DataTypes.UUID,
    idStudent: DataTypes.UUID,
    assignGrade: DataTypes.FLOAT,
    quizGrade: DataTypes.FLOAT,
    midGrade: DataTypes.FLOAT,
    finalGrade: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'studentGrades',
  });
  return studentGrades;
};