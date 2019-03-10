import firebase from "@/lib/firebase";

const getUserToken = function() {
  return firebase.auth().currentUser.getIdToken(true);
};

export const saveLoginUser = async function() {
  const idToken = await getUserToken();
  const res = await fetch("/api/saveuser", {
    headers: {
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};
