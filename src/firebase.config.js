import {getApp,getApps,initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getDatabase} from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyCl7K60SghoA9BAVC3nPKKgWAXS42lRKQ4",
    authDomain: "restaurant-app-60a2f.firebaseapp.com",
    databaseURL: "https://restaurant-app-60a2f-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-60a2f",
    storageBucket: "restaurant-app-60a2f.appspot.com",
    messagingSenderId: "508339750874",
    appId: "1:508339750874:web:5da060aeb49239d22e62e3",
    measurementId: "G-0PKYKXX0G1"
  };
  const app =getApps.length >0 ? getApp() : initializeApp(firebaseConfig);
  const db=getFirestore(app);
  const storage=getStorage(app);
  const database=getDatabase(app);
  export {db,storage,app,database};

