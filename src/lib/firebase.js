import firebase from "firebase/app";
import config from "../config/config";

firebase.initializeApp(config.firebase);

export default firebase;
