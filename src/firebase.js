import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//import 'bootstrap/dist/css/bootstrap.min.css';


  var firebaseConfig = {
    apiKey: "AIzaSyAl8ucU1_XRCXuDk3vk7217Ni7S1lgy1bU",
    authDomain: "webapp-1b370.firebaseapp.com",
    databaseURL: "https://webapp-1b370-default-rtdb.firebaseio.com",
    projectId: "webapp-1b370",
    storageBucket: "webapp-1b370.appspot.com",
    messagingSenderId: "185151959808",
    appId: "1:185151959808:web:5bf9fcadf845bf47a939e5",
    measurementId: "G-QG26221LKZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();



  export default firebase;