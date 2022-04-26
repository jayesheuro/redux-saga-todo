import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDZjOtR_tyGx4iRUyubAM1WfuJcaMvtTE",
  authDomain: "react-redux-saga-crud.firebaseapp.com",
  databaseURL: "https://react-redux-saga-crud-default-rtdb.firebaseio.com",
  projectId: "react-redux-saga-crud",
  storageBucket: "react-redux-saga-crud.appspot.com",
  messagingSenderId: "846367151990",
  appId: "1:846367151990:web:40cdbeb44be49e2fc30c57",
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
