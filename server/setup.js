const {
  saveLocalUser,
  getCurrentUserId,
  deleteCurrentUser
} = require("./user");

const setup = function(app) {
  app.use("/api/saveuser", saveLocalUser);
  app.use("/api/currentuserid", getCurrentUserId);
  app.use("/api/deletecurrentuser", deleteCurrentUser);
};

module.exports = setup;
