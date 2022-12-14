const router = require('express').Router()
const { tokenExtractor, sessionExtractor } = require('../util/middlewares')
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ['name']
    },
    order: [
      ['likes', 'DESC']
    ],
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, sessionExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    if (!user || user.disabled) {
      res.status(401).json({
        errorMessage: 'Missing or Invalid Token.'
      })
    }

    if (user.disabled) {
      return res.status(403).send({ error: "Session expired, please log in again."})
    }

    const blog = Blog.create(
      {
        ...req.body,
        userId: user.id,
        likes: 0,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    if (!user || user.disabled) {
      res.status(401).json({
        errorMessage: 'Missing or Invalid Token.'
      })
    }

    if (req.blog.userId === user.id) {
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
    req.blog.updatedAt = new Date()
    await req.blog.save()
    res.json({
      likes: req.blog.likes,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router