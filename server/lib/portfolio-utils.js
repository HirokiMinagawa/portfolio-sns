const db = require("../db/connection");

const getPortfolioInfoById = async portfolioId => {
  const connection = await db.getConnection();
  const [resultsOfPortfolios] = await connection.query(
    "select url, title, description, thumbnail_url, created_by from portfolios where id = ?;",
    [portfolioId]
  );
  const portfolioInfo = resultsOfPortfolios[0];
  if (!portfolioInfo) return null;

  const userId = portfolioInfo.created_by;
  const [resultsOfUsers] = await connection.query(
    "select name from users where id = ?",
    [userId]
  );
  const user = resultsOfUsers[0];
  portfolioInfo.userName = user.name;

  const [resultsOfProgrammingLanguage] = await connection.query(
    "select name from portfolio_programming_language ppl inner join programming_languages pl on ppl.programming_language_id = pl.id where portfolio_id = ?;",
    [portfolioId]
  );
  portfolioInfo.programmingLanguages = resultsOfProgrammingLanguage.map(
    obj => obj.name
  );
  portfolioInfo.id = portfolioId;

  const [resultsOfLikes] = await connection.query(
    "select count(*) from likes where portfolio_id = ?",
    [portfolioId]
  );
  const like = resultsOfLikes[0];
  if (like) {
    portfolioInfo.like = like["count(*)"];
  } else {
    portfolioInfo.like = 0;
  }
  return portfolioInfo;
};

module.exports = { getPortfolioInfoById };
