import firebase from "firebase";
import config from "../config/config";

firebase.initializeApp(config.firebase);

export default firebase;
