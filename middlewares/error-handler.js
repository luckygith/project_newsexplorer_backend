const errorHandler = (err, req, res, next) => {
  console.error(err);
  // if error has no status, default to 500!
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

module.exports = { errorHandler };
