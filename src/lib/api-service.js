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

export const getcurrentUserId = async function() {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/currentuserid`, {
    headers: {
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const checkEditRights = async function(userId) {
  const { currentUserId } = await getcurrentUserId();
  return Number(userId) === Number(currentUserId);
};

export const deleteCurrentUser = async function() {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/deletecurrentuser`, {
    headers: {
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const updateUserInfo = async function(userInfo) {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/userinfo`, {
    method: "post",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const getProgrammingLanguageList = async function() {
  const res = await fetch(`/api/programminglanguage`);
  return res.json();
};

export const getUserInfo = async function(userId) {
  const res = await fetch(`/api/userinfo/${userId}`, {
    method: "get"
  });
  return res.json();
};
