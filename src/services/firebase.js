import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";

// config for institute
const config = {
  apiKey: "AIzaSyCmOWm_VEzYodG_PzusXD61HmEkSyV1Kcw",
  authDomain: "thalaivan-restaurant.firebaseapp.com",
  projectId: "thalaivan-restaurant",
  storageBucket: "thalaivan-restaurant.appspot.com",
  messagingSenderId: "1084918476722",
  appId: "1:1084918476722:web:1502d45a5f59d483977eab",
  measurementId: "G-ZKVE7EMKFJ"
};

const restaurant = firebase.initializeApp(config);

restaurant.analytics();
// firebase.analytics();
const db = restaurant.firestore();
const auth = restaurant.auth();

// offline support
db.enablePersistence({ experimentalTabSynchronization: true })
  .then(() => {
    console.log("Woohoo! Multi-Tab Persistence!");
  })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(
        "multiple tab is opened please close this tab and use only one tab, when offline"
      );
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(
        "Current Browser or its version doesn't support offline mode"
      );
    }
  });
export { db, auth, firebase };
