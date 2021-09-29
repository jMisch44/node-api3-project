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

router.get("/:id/posts", validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  const { id } = req.params;
  const postInfo = { ...req.body, user_id: id };
  Posts.insert(postInfo)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
});

module.exports = router;
