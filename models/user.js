'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userId:{
      primaryKey: true,
      type: DataTypes.STRING,
    },
    id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8_generak_Ci'
  });
  
  User.associate = models => {
    User.hasMany(models.Board);
    User.hasMany(models.Like);
    User.hasMany(models.Comment);
  };
  return User;
};