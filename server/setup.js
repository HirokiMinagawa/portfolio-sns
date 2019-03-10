const { saveLocalUser } = require("./auth");

const setup = function(app) {
  app.use("/api/saveuser", saveLocalUser);
};

module.exports = setup;
