import firebase from "@/lib/firebase";

const getUserToken = async function() {
  const currentUser = await firebase.auth().currentUser;
  if (!currentUser) return null;
  return await currentUser.getIdToken(true);
};

export const saveLoginUser = async function() {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch("/api/saveuser", {
    headers: {
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

const getcurrentUserId = async function() {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/currentuserid`, {
    headers: {
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const checkAccessRights = async function(userId) {
  const { currentUserId } = await getcurrentUserId();
  return Number(userId) === Number(currentUserId);
};
