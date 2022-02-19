'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8_generak_Ci'
  });
  Comment.associate = models => {
    Comment.belongsTo(models.Board) //{foreignKey: "postId", targetKey: "postId"}); 생략가능
    Comment.belongsTo(models.User)
  };
  return Comment;
};