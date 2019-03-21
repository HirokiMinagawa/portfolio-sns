const db = require("../db/connection");

const increaseLike = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const connection = await db.getConnection();
    await connection.query("insert into `likes` (portfolio_id) VALUES (?);", [
      portfolioId
    ]);
    const [results] = await connection.query(
      "select count(*) from likes where portfolio_id = ?",
      [portfolioId]
    );
    const like = results[0]["count(*)"];
    return res.status(200).json({ like });
  } catch (error) {
    next(error);
  }
};

const decreaseLike = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const connection = await db.getConnection();
    await connection.query(
      "delete from likes where portfolio_id = ? order by created_at desc limit 1;",
      [portfolioId]
    );
    const [results] = await connection.query(
      "select count(*) from likes where portfolio_id = ?",
      [portfolioId]
    );
    const like = results[0]["count(*)"];
    return res.status(200).json({ like });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  increaseLike,
  decreaseLike
};
