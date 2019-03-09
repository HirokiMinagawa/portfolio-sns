// const db = require('./db/connection');

const setup = function(app) {
  app.use("/hello", async (req, res, next) => {
    res.json("hello world");
  });
};

module.exports = setup;
