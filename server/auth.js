const admin = require("firebase-admin");
const config = require("./config");
const db = require("./db/connection");

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseAccountServiceKey)
});

const verifyUserToken = async idToken => {
  const decodedidToken = await admin.auth().verifyIdToken(idToken);
  // console.log(decodedidToken);
  return decodedidToken;
};

const saveLocalUser = async (req, res) => {
  const authorization = req.header("authorization");
  const idToken = authorization.split(" ")[1];
  if (!idToken) {
    return res.status(401).json({ message: "ログインしてください。" });
  }

  const decodedidToken = await verifyUserToken(idToken);

  if (!decodedidToken) {
    return res.status(401).json({ message: "ログインしてください。" });
  }
  const connection = await db.getConnection();
  const { uid, name } = decodedidToken;
  const [results] = await connection.query(
    "select id from users where users.auth_uid = ?",
    [uid]
  );
  const user = results[0];

  if (user) {
    // if user is already registerd
    return res.status(200).json({ message: "ログインしました。" });
  } else {
    const [results] = await connection.query(
      "insert into users(auth_uid, name) values(?,?)",
      [uid, name]
    );
    return res.status(200).json({ message: "登録しました。" });
  }
};

module.exports = {
  saveLocalUser
};
