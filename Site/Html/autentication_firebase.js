//Armazena as credenciais do Firebase em uma constante
// const firebaseConfig = {
//     apiKey: "AIzaSyDOCg6kqirThQKx3R6zd5VNphTqbbuA1Rc",
//     authDomain: "fir-crud-e99a4.firebaseapp.com",
//     projectId: "fir-crud-e99a4",
//     storageBucket: "fir-crud-e99a4.appspot.com",
//     messagingSenderId: "319998441027",
//     appId: "1:319998441027:web:01e4f3fe3d2a57dd3c46f6",
//     measurementId: "G-7437FP6V3J"
//   };


const firebaseConfig = {
    apiKey: "AIzaSyBNacMOZfPsEuDb_bQwF7-gryY8KpG3i3c",
    authDomain: "fir-test-ce602.firebaseapp.com",
    projectId: "fir-test-ce602",
    storageBucket: "fir-test-ce602.appspot.com",
    messagingSenderId: "45354924159",
    appId: "1:45354924159:web:f3fca6d7880c7282f7274a",
    measurementId: "G-P1R0CZ2FLD"
};

//Inicializa o Firebase com a constante contendo as credenciais do Firebase
firebase.initializeApp(firebaseConfig)


// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//     } else {
//         // User is signed out
//         if (location.pathname.split('/')[8] == "login.html") {
//             return
//         } else {
//             window.location.href = ("../login/login.html")
//         }
//     }
// });

//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();

const Categoria = "devices"