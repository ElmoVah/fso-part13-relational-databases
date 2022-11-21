const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        reference: { model: 'users', key: 'id' }
      },
      blogId: {
        type: DataTypes.STRING,
        allowNull: false,
        reference: { model: 'blogs', key: 'id' }
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading')
  }
}