const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasOne(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: Readinglist });
User.belongsToMany(Blog, { through: Readinglist,  as: 'readings' });

module.exports = {
  Blog, User, Readinglist, Session
}