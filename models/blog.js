const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  },
  year: {
    type: DataTypes.INTEGER,
    default: false,
    validate: {
      min: {
        args: 1991,
        msg: "Year needs to be atleast 1991.",
      },
      max: {
        args: new Date().getFullYear(),
        msg: "Year cant be greater than current year.",
      }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at"
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blogs'
})

module.exports = Blog