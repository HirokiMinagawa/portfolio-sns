const db = require("../db/connection");
const { validationResult } = require("express-validator/check");
const { getPortfolioInfoById } = require("../lib/portfolio-utils");

const savePortfolio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { userId } = req;
  try {
    const {
      portfolioUrl,
      title,
      description,
      programmingLanguages,
      thumbnailUrl
    } = req.body;
    const connection = await db.getConnection();
    const [results] = await connection.query(
      "insert into `portfolios` (url, title, description, thumbnail_url, created_by) VALUES (?, ?, ?, ?, ?);",
      [portfolioUrl, title, description, thumbnailUrl, userId]
    );
    const { insertId } = results;
    for (let i = 0; i < programmingLanguages.length; i++) {
      const [results] = await connection.query(
        "select id from programming_languages where name = ?",
        [programmingLanguages[i]]
      );
      if (results[0]) {
        await connection.query(
          "insert into `portfolio_programming_language` (portfolio_id, programming_language_id) VALUES (?, ?);",
          [insertId, results[0].id]
        );
      }
    }
    return res.status(200).json({ message: "ポートフォリオを登録しました。" });
  } catch (error) {
    next(error);
  }
};

const getPortfolioInfo = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const portfolioInfo = await getPortfolioInfoById(portfolioId);
    if (!portfolioInfo) {
      return res
        .status(401)
        .json({ message: "ポートフォリオが見つかりません。" });
    } else {
      return res.status(200).json(portfolioInfo);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  savePortfolio,
  getPortfolioInfo
};
