const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `${req.method} was made at ${req.originalUrl} at find time key ${req.header.Date}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next({ status: 404, message: "user not found" });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    next({ status: 400, message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || typeof text !== "string" || !text.trim()) {
    next({ status: 400, message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
