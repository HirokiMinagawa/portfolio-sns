const { check } = require("express-validator/check");

const updateUserInfo = [
  check("selfIntroduction")
    .not()
    .isEmpty()
    .isString()
    .isLength({ max: 50 }),
  check("programmingLanguages")
    .not()
    .isEmpty(),
  check("programmingExperience")
    .not()
    .isEmpty()
    .isFloat({ min: 0.1, max: 99 })
];

const savePortfolio = [
  check("portfolioUrl")
    .not()
    .isEmpty()
    .isURL(),
  check("title")
    .not()
    .isEmpty()
    .isString()
    .isLength({ max: 30 }),
  check("description")
    .not()
    .isEmpty()
    .isString()
    .isLength({ max: 140 }),
  check("programmingLanguages")
    .not()
    .isEmpty()
];

module.exports = {
  updateUserInfo,
  savePortfolio
};
