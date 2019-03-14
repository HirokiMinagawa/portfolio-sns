const db = require("../db/connection");

const alreadyUserExists = async (req, res, next) => {
  return res.status(200).json({ message: "ログインしました。" });
};

const getCurrentUserId = async (req, res, next) => {
  const { userId } = req;
  return res.status(200).json({ currentUserId: userId });
};

const deleteCurrentUser = async (req, res, next) => {
  const { userId } = req;
  try {
    const connection = await db.getConnection();
    const [results] = await connection.query("delete from users where id = ?", [
      userId
    ]);
    return res.status(200).json({ message: "ユーザー情報を削除しました。" });
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  const { userId } = req;
  try {
    const {
      selfIntroduction,
      programmingLanguages,
      programmingExperience,
      gitHubAccount,
      twitterAccount,
      otherURL,
      otherUrlDescription
    } = req.body;
    const connection = await db.getConnection();
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
      await connection.query(
        "INSERT INTO `user_programming_language` (user_id, programming_language_id) VALUES (?, ?);",
        [userId, results[0].id]
      );
    }
    return res.status(200).json({ message: "ユーザー情報を更新しました。" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  alreadyUserExists,
  getCurrentUserId,
  deleteCurrentUser,
  updateUserInfo
};
