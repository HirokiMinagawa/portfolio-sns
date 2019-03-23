const db = require("../db/connection");

const getProgrammingLanguageList = async (req, res, next) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [results] = await connection.query(
      "select name from programming_languages"
    );
    const list = results.map(obj => obj.name);
    return res.status(200).json({ name: list });
  } catch (error) {
    next(error);
  } finally {
    await connection.end();
  }
};

module.exports = {
  getProgrammingLanguageList
};
