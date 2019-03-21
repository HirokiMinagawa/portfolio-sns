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

export const createPortfolio = async function(portfolioInfo) {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/portfolio`, {
    method: "post",
    body: JSON.stringify(portfolioInfo),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const getPortfolioInfo = async function(portfolioId) {
  const res = await fetch(`/api/portfolioinfo/${portfolioId}`, {
    method: "get"
  });
  return res.json();
};

export const getAllPortfolioInfo = async function() {
  const res = await fetch(`/api/portfolioinfo`, {
    method: "get"
  });
  return res.json();
};

const getThumbnailBase64 = async function(portfolioUrl) {
  const res = await fetch("/api/thumbnail", {
    method: "post",
    body: JSON.stringify({ portfolioUrl }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  return res.json();
};

export const getThumbnailUrl = async function(
  portfolioUrl,
  currentUserId,
  title
) {
  let thumbnailUrl = "";
  const { base64 } = await getThumbnailBase64(portfolioUrl);
  if (base64 && !base64.message) {
    const fileName = currentUserId + ":" + title;
    thumbnailUrl = await uploadImage(base64, fileName);
    return thumbnailUrl;
  } else {
    return null;
  }
};

const uploadImage = async function(base64, fileName) {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const jpgRef = storageRef.child("thumbnail/" + fileName + ".jpg");
  const blob = base64ToBlob(base64);
  await jpgRef.put(blob);
  const res = await jpgRef.getDownloadURL();
  return res;
};

const base64ToBlob = base64 => {
  const byteString = atob(base64.split(",")[1]);
  const mimeType = base64.match(/(:)([a-z/]+)(;)/)[2];
  for (
    var i = 0, l = byteString.length, content = new Uint8Array(l);
    l > i;
    i++
  ) {
    content[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([content], {
    type: mimeType
  });
  return blob;
};
