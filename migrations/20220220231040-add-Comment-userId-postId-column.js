module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Comments',
        'userId',
        {
          type: Sequelize.DataTypes.STRING,
          reference:{
            model: {
              tableName: 'Useers',
              key: 'userId'
            }
          }
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'Comments',
        'postId',
        {
          type: Sequelize.DataTypes.INTEGER,
          reference:{
            model: {
              tableName: 'Boards',
              key: 'postId'
            }
          }
        },
        { transaction }
      );
      
      
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Comments', 'userId', { transaction });
      await queryInterface.removeColumn('Comments', 'postId', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};