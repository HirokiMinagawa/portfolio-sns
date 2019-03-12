const { saveLocalUser, getCurrentUserId } = require("./auth");

const setup = function(app) {
  app.use("/api/saveuser", saveLocalUser);
  app.use("/api/currentuserid", getCurrentUserId);
};

module.exports = setup;
