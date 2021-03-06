const db = require("../db/connection");
const { validationResult } = require("express-validator/check");
const { getPortfolioInfoById } = require("../lib/portfolio-utils");

const alreadyUserExists = async (req, res, next) => {
  return res.status(200).json({ message: "ログインしました。" });
};

const getCurrentUserId = async (req, res, next) => {
  const { userId } = req;
  return res.status(200).json({ currentUserId: userId });
};

const deleteCurrentUser = async (req, res, next) => {
  let connection;
  try {
    const { userId } = req;
    connection = await db.getConnection();
    const [results] = await connection.query("delete from users where id = ?", [
      userId
    ]);
    return res.status(200).json({ message: "ユーザー情報を削除しました。" });
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

const updateUserInfo = async (req, res, next) => {
  let connection;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { userId } = req;
    const {
      selfIntroduction,
      programmingLanguages,
      programmingExperience,
      gitHubAccount,
      twitterAccount,
      otherURL,
      otherUrlDescription
    } = req.body;
    connection = await db.getConnection();
    await connection.query(
      "update users set self_introduction = ?, programming_experience = ?, github_account = ?, twitter_account = ?, other_url = ?, other_url_comment = ? where id = ?",
      [
        selfIntroduction,
        programmingExperience,
        gitHubAccount,
        twitterAccount,
        otherURL,
        otherUrlDescription,
        userId
      ]
    );
    await connection.query(
      "delete from user_programming_language where user_id = ?",
      [userId]
    );
    for (let i = 0; i < programmingLanguages.length; i++) {
      const [results] = await connection.query(
        "select id from programming_languages where name = ?",
        [programmingLanguages[i]]
      );
      if (results[0]) {
        await connection.query(
          "INSERT INTO `user_programming_language` (user_id, programming_language_id) VALUES (?, ?);",
          [userId, results[0].id]
        );
      }
    }
    return res.status(200).json({ message: "ユーザー情報を更新しました。" });
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

const getUserInfo = async (req, res, next) => {
  let connection;
  try {
    const { userId } = req.params;
    connection = await db.getConnection();
    const [results] = await connection.query(
      "select name, prof_img_url, self_introduction, programming_experience, github_account, twitter_account, other_url, other_url_comment from users where id = ?",
      [userId]
    );
    const user = results[0];
    if (!user) {
      return res.status(401).json({ message: "ユーザーが見つかりません。" });
    } else {
      const [resultsOfprogrammingLanguage] = await connection.query(
        "select name from user_programming_language upl inner join programming_languages pl on upl.programming_language_id = pl.id where user_id = ?;",
        [userId]
      );
      user.programmingLanguages = resultsOfprogrammingLanguage.map(
        obj => obj.name
      );

      const [resultsOfPortfolio] = await connection.query(
        "select id from portfolios where created_by = ?;",
        [userId]
      );
      let portfolioIds = resultsOfPortfolio[0];
      if (portfolioIds) {
        const portfolios = [];
        for (let i = 0; i < resultsOfPortfolio.length; i++) {
          portfolios[i] = await getPortfolioInfoById(resultsOfPortfolio[i].id);
        }
        user.portfolios = portfolios;
      }
      return res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

module.exports = {
  alreadyUserExists,
  getCurrentUserId,
  deleteCurrentUser,
  updateUserInfo,
  getUserInfo
};
