const router = require('express').Router()
const { tokenExtractor } = require('../util/middlewares')

const Readinglist = require('../models/readinglist')
const User = require('../models/user')

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

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    if (!user) {
      res.status(401).json({
        errorMessage: 'Missing or Invalid Token.'
      })
    }

    const readinglist = await Readinglist.findByPk(req.params.id)
    readinglist.read = req.body.read;
    await readinglist.save();
    res.json(readinglist)
  } catch (error) {
    next(error)
  }
})

module.exports = router