const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name == "ReferenceError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  if (error.name == "SequelizeValidationError") {
    return res.status(400).send({ error: "missing or malformatted data" });
  }

  if (error.name == "TypeError") {
    return res.status(400).send({ error: "Something went seriously wrong!" });
  }

  next(error)
}

module.exports = { errorHandler }