const router = require('express').Router()

const { where } = require('sequelize')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title']
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res, next) => {
  let where = {}

  if (req.query.read === "true") {
    where.read = true
  }

  if (req.query.read === "false") {
    where.read = false
  }

  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt']
    },
    include: {
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['userId', 'blogId', 'createdAt', 'updatedAt']
      },
      through: {
        attributes: ['read', 'id'],
        as: 'readinglists',
        where,
      }
    }
  })

  if (user) {
    res.json(user)
  } else {
    next(error)
  }
})

module.exports = router