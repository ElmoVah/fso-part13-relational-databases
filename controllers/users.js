const router = require('express').Router()

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

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router