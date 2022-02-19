'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * Thins method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Board.init({
    postId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Board',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8_generak_Ci'
  });
  Board.associate = models => {
    Board.belongsTo(models.Board);
    Board.hasMany(models.Like);
    Board.hasMany(models.Comment);
  };
  return Board;
};