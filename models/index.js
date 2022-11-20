const Blog = require('./blog')
const User = require('./user')

User.hasOne(Blog)
Blog.belongsTo(User)

module.exports = {
  Blog, User
}