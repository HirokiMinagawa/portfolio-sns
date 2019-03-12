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

const getLocalUserId = async function({ uid }) {
  const connection = await db.getConnection();
  const [results] = await connection.query(
    "select id from users where users.auth_uid = ?",
    [uid]
  );
  const user = results[0];
  if (user) {
    return user.id;
  } else {
    return null;
  }
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
  // const connection = await db.getConnection();
  // const { uid, name, picture } = decodedidToken;
  // const [results] = await connection.query(
  //   "select id from users where users.auth_uid = ?",
  //   [uid]
  // );
  // const user = results[0];

  const userId = await getLocalUserId(decodedidToken);

  if (userId) {
    // if user is already registerd
    return res.status(200).json({ message: "ログインしました。" });
  } else {
    const { uid, name, picture } = decodedidToken;
    const connection = await db.getConnection();
    const [results] = await connection.query(
      "insert into users(auth_uid, name, prof_img_url) values(?,?,?)",
      [uid, name, picture]
    );
    return res.status(200).json({ message: "登録しました。" });
  }
};

const getCurrentUserId = async (req, res, next) => {
  const authorization = req.header("authorization");
  const idToken = authorization.split(" ")[1];
  if (!idToken) {
    return res.status(200).json({ currentUserId: null });
  }

  const decodedidToken = await verifyUserToken(idToken);

  if (!decodedidToken) {
    return res.status(200).json({ currentUserId: null });
  }
  const userId = await getLocalUserId(decodedidToken);
  if (!userId) {
    return res.status(200).json({ currentUserId: null });
  } else {
    return res.status(200).json({ currentUserId: userId });
  }
};

module.exports = {
  saveLocalUser,
  getCurrentUserId
};
