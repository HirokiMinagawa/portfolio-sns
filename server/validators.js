const { check } = require("express-validator/check");

const updateUserInfo = [
  check("selfIntroduction")
    .not()
    .isEmpty()
    .isString()
    .isLength({ max: 300 }),
  check("programmingLanguages")
    .not()
    .isEmpty(),
  check("programmingExperience")
    .not()
    .isEmpty()
    .isFloat({ min: 0.1, max: 99 })
];

module.exports = {
  updateUserInfo
};
