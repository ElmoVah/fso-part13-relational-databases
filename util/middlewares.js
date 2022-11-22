const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name == "ReferenceError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  if (error.name == "SequelizeValidationError") {
    return res.status(400).send({ error: error.errors.message });
  }

  if (error.name == "TypeError") {
    return res.status(400).send({ error: "Something went seriously wrong!" });
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const sessionExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  const token = authorization.substring(7)

  const session = await Session.findOne({
    where: {
      token: token,
    }
  })

  if (session.valid) {
    req.session = session
    next()
  } else {
    res.status(403).json({ error: "Session expired, please log in again" });
  }
}

module.exports = { errorHandler, tokenExtractor, sessionExtractor }