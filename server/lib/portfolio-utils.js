const db = require("../db/connection");

const getPortfolioInfoById = async portfolioId => {
  const connection = await db.getConnection();
  const [resultsOfPortfolioAndUser] = await connection.query(
    "select url, title, description, thumbnail_url, p.created_by ,name as userName from portfolios p inner join users u on p.created_by = u.id  where p.id = ?;",
    [portfolioId]
  );
  const portfolioInfo = resultsOfPortfolioAndUser[0];
  if (!portfolioInfo) return null;

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
