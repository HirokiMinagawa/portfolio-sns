const db = require("../db/connection");
const { validationResult } = require("express-validator/check");
const { getPortfolioInfoById } = require("../lib/portfolio-utils");

const savePortfolio = async (req, res, next) => {
  let connection;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { userId } = req;
    const {
      portfolioUrl,
      title,
      description,
      programmingLanguages,
      thumbnailUrl
    } = req.body;
    connection = await db.getConnection();
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
  } finally {
    await connection.end();
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

const getAllPortfolioInfo = async (req, res, next) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [resultsOfPortfolio] = await connection.query(
      "select id from portfolios"
    );
    let portfolioIds = resultsOfPortfolio[0];
    if (!portfolioIds) {
      return res
        .status(401)
        .json({ message: "ポートフォリオが見つかりません。" });
    } else {
      const portfolios = [];
      for (let i = 0; i < resultsOfPortfolio.length; i++) {
        portfolios[i] = await getPortfolioInfoById(resultsOfPortfolio[i].id);
      }
      return res.status(200).json(portfolios);
    }
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

const deletePortfolio = async (req, res, next) => {
  let connection;
  try {
    const { portfolioId } = req.params;
    connection = await db.getConnection();
    const [results] = await connection.query(
      "delete from portfolios where id = ?",
      [portfolioId]
    );
    return res.status(200).json({ message: "ポートフォリオを削除しました。" });
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

const updatePortfolio = async (req, res, next) => {
  let connection;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { userId } = req;
    const {
      portfolioId,
      portfolioUrl,
      title,
      description,
      programmingLanguages,
      thumbnailUrl
    } = req.body;
    connection = await db.getConnection();
    await connection.query(
      "update portfolios set url = ?, title = ?, description = ?, thumbnail_url = ? where id = ?",
      [portfolioUrl, title, description, thumbnailUrl, portfolioId]
    );
    await connection.query(
      "delete from  portfolio_programming_language where portfolio_id = ?",
      [portfolioId]
    );
    for (let i = 0; i < programmingLanguages.length; i++) {
      const [results] = await connection.query(
        "select id from programming_languages where name = ?",
        [programmingLanguages[i]]
      );
      if (results[0]) {
        await connection.query(
          "INSERT INTO `portfolio_programming_language` (portfolio_id, programming_language_id) VALUES (?, ?);",
          [portfolioId, results[0].id]
        );
      }
    }
    return res.status(200).json({ message: "ポートフォリオを更新しました。" });
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

module.exports = {
  savePortfolio,
  getPortfolioInfo,
  getAllPortfolioInfo,
  deletePortfolio,
  updatePortfolio
};
