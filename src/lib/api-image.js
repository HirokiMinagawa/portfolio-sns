import firebase from "@/lib/firebase";

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
    thumbnailUrl = await uploadThumbnailOnFirebase(base64, fileName);
    return thumbnailUrl;
  } else {
    return null;
  }
};

const uploadThumbnailOnFirebase = async function(base64, fileName) {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const jpgRef = storageRef.child("thumbnail/" + fileName + ".jpg");
  const blob = base64ToBlob(base64);
  await jpgRef.put(blob);
  const res = await jpgRef.getDownloadURL();
  return res;
};

export const base64ToBlob = base64 => {
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

export const deleteThumbnailOnFirebase = async function(userId, title) {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const fileName = userId + ":" + title;
  const jpgRef = storageRef.child("thumbnail/" + fileName + ".jpg");
  await jpgRef.delete();
};
