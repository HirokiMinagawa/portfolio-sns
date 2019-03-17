const db = require("../db/connection");

const getProgrammingLanguageList = async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query(
      "select name from programming_languages"
    );
    const list = results.map(obj => obj.name);
    return res.status(200).json({ name: list });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProgrammingLanguageList
};
