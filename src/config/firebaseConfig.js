// Import the functions you need from the SDKs you need
    //import firebase from 'firebase/app'
    import 'firebase/firestore'
    import 'firebase/auth'

    import { initializeApp } from "firebase/app";
    import { getAuth, browserLocalPersistence } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';

    //import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
  };

// Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    //const analytics = getAnalytics(app);
    //firebase.firestore().settings({timestampsInSnapshots: true});

    export { firebaseApp, auth, db };
    
    export default firebaseConfig;