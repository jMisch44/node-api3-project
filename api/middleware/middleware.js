function logger(req, res, next) {
  console.log(
    `${req.method} was made at ${req.originalUrl} at find time key ${req}  `
  );
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = {
  logger,
};
