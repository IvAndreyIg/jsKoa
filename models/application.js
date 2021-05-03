'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  };
  Application.init({
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Application',
    timestamps: false
  });
  return Application;
};