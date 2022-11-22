const router = require('express').Router();
const { sessionExtractor, tokenExtractor } = require('../util/middlewares')

router.delete("/", tokenExtractor, sessionExtractor, async (req, res, next) => {
  try {
    req.session.valid = false;
    req.session.save();
    return response.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error)
  }
})

module.exports = router;