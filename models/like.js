'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    likeId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    check: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8_generak_Ci',
  });
  Like.associate = models => {
    Like.belongsTo(models.Board);
    Like.belongsTo(models.User);
  };
  return Like;
};