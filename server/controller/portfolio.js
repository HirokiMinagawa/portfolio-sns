const db = require("../db/connection");
const { validationResult } = require("express-validator/check");

const savePortfolio = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { userId } = req;
  try {
    const { portfolioUrl, title, description, programmingLanguages } = req.body;
    const connection = await db.getConnection();
    const [results] = await connection.query(
      "insert into `portfolios` (url, title, description, created_by) VALUES (?, ?, ?, ?);",
      [portfolioUrl, title, description, userId]
    );
    const { insertId } = results;
    for (let i = 0; i < programmingLanguages.length; i++) {
      const [results] = await connection.query(
        "select id from programming_languages where name = ?",
        [programmingLanguages[i]]
      );
      await connection.query(
        "insert into `portfolio_programming_language` (portfolio_id, programming_language_id) VALUES (?, ?);",
        [insertId, results[0].id]
      );
    }
    return res.status(200).json({ message: "ポートフォリオを登録しました。" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  savePortfolio
};
