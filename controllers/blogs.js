const router = require('express').Router()
const { tokenExtractor } = require('../util/middlewares')

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = Blog.create({ ...req.body, userId: user.id, likes: 0, date: new Date() })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

//Middleware for single blogs
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy()
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

//For updating likes
router.put('/:id', blogFinder, async (req, res) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json({
      likes: req.blog.likes
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router