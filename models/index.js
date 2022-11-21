const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasOne(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: Readinglist });
User.belongsToMany(Blog, { through: Readinglist });

module.exports = {
  Blog, User, Readinglist
}