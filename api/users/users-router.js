const express = require('express');
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model.js");
const {
  validateUser,
  validateUserId,
  validatePost,
} = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await Users.get());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  Users.getById(req.params.id)
    .then((user) => {
      Users.remove(user.id)
        .then((remove) => {
          res.status(200).json(user);
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;
