import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "***",
    authDomain: "***",
    projectId: "***",
    storageBucket: "***",
    messagingSenderId: "***",
    appId: "***"
  };
  
  const firebseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {timestamp}
  export default firebseApp.firestore()