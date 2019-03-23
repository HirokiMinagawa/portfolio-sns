const db = require("../db/connection");

const increaseLike = async (req, res, next) => {
  let connection;
  try {
    const { portfolioId } = req.params;
    connection = await db.getConnection();
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
  } finally {
    await connection.end();
  }
};

const decreaseLike = async (req, res, next) => {
  let connection;
  try {
    const { portfolioId } = req.params;
    connection = await db.getConnection();
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
  } finally {
    await connection.end();
  }
};

module.exports = {
  increaseLike,
  decreaseLike
};
