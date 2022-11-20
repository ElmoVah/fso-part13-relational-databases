const router = require('express').Router()
const { sequelize } = require('../util/db')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [
      [sequelize.fn("sum", sequelize.col("likes")), "DESC"]
    ]
  })
  res.json(authors)
})

module.exports = router