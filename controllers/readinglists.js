const router = require('express').Router()
const { sequelize } = require('../util/db')

const Readinglist = require('../models/readinglist')

router.post('/', async (req, res, next) => {
  try {
    const readinglist = await Readinglist.create({
      userId: req.body.userId,
      blogId: req.body.blogId
    })
    res.json(readinglist)
  } catch (error) {
    next(error)
  }
})

module.exports = router