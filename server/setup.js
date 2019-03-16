const {
  alreadyUserExists,
  getCurrentUserId,
  deleteCurrentUser,
  updateUserInfo,
  getUserInfo
} = require("./controller/user");

const {
  getProgrammingLanguageList
} = require("./controller/programminglanguage");

const { authUser } = require("./auth.js");

const setup = function(app) {
  app.use("/api/saveuser", authUser, alreadyUserExists);
  app.use("/api/currentuserid", authUser, getCurrentUserId);
  app.use("/api/deletecurrentuser", authUser, deleteCurrentUser);
  app.post("/api/userinfo", authUser, updateUserInfo);
  app.get(`/api/userinfo/:userId`, getUserInfo)
  app.use("/api/programminglanguage", getProgrammingLanguageList);
};

module.exports = setup;
