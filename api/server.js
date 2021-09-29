const express = require('express');
const { logger } = require("./middleware/middleware.js");
const usersRouter = require("./users/users-router.js");
const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(errorHandling);

module.exports = server;

function errorHandling(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}
