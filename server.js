const express = require("express");
const PORT = 8080;
const server = express();

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const url = `${req.protocol}://${req.hostname}:${PORT}${req.url}`;
  const timestamp = new Date();

  console.table({
    METHOD: req.method,
    URL: url,
    TIMESTAMP: timestamp.toDateString(),
  });

  next();
}

module.exports = { server, logger, PORT };
