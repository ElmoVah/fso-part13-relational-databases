const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      default: false,
      validate: {
        min: {
          args: 1991,
          msg: "Year needs to be atleast 1991."
        },
        max: {
          args: new Date().getFullYear(),
          msg: "Year can't be greater than current year."
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}