var firebaseConfig = {
    apiKey: "AIzaSyAPcEx7NNKgLOSlsjQXkbv3QaLHLhe27m8",
    authDomain: "app-teste-ad56f.firebaseapp.com",
    databaseURL: "https://app-teste-ad56f-default-rtdb.firebaseio.com",
    projectId: "app-teste-ad56f",
    storageBucket: "app-teste-ad56f.appspot.com",
    messagingSenderId: "622101019355",
    appId: "1:622101019355:web:92513b0aed87fc3ab66afe",
    measurementId: "G-84B0BBVRW2"
  };

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();