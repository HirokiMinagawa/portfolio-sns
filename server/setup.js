const {
  alreadyUserExists,
  getCurrentUserId,
  deleteCurrentUser,
  updateUserInfo,
  getUserInfo
} = require("./controller/user");
const validators = require("./validators");

const {
  getProgrammingLanguageList
} = require("./controller/programminglanguage");

const { savePortfolio, getPortfolioInfo } = require("./controller/portfolio");

const { authUser } = require("./auth.js");

const { getThumbnailBase64 } = require("./controller/image");

const setup = function(app) {
  app.use("/api/saveuser", authUser, alreadyUserExists);
  app.use("/api/currentuserid", authUser, getCurrentUserId);
  app.use("/api/deletecurrentuser", authUser, deleteCurrentUser);
  app.post(
    "/api/userinfo",
    authUser,
    validators.updateUserInfo,
    updateUserInfo
  );
  app.get(`/api/userinfo/:userId`, getUserInfo);
  app.use("/api/programminglanguage", getProgrammingLanguageList);
  app.post("/api/portfolio", authUser, validators.savePortfolio, savePortfolio);
  app.get(`/api/portfolioinfo/:portfolioId`, getPortfolioInfo);
  app.post("/api/thumbnail", getThumbnailBase64);
};

module.exports = setup;
