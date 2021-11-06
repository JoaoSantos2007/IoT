//Armazena as credenciais do Firebase em uma constante
const firebaseConfig = {
    apiKey: "AIzaSyDOCg6kqirThQKx3R6zd5VNphTqbbuA1Rc",
    authDomain: "fir-crud-e99a4.firebaseapp.com",
    projectId: "fir-crud-e99a4",
    storageBucket: "fir-crud-e99a4.appspot.com",
    messagingSenderId: "319998441027",
    appId: "1:319998441027:web:01e4f3fe3d2a57dd3c46f6",
    measurementId: "G-7437FP6V3J"
};

//Inicializa o Firebase com a constante contendo as credenciais do Firebase
firebase.initializeApp(firebaseConfig)


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    } else {
        // User is signed out
        if (location.pathname == "/Site/user/login/login.html") {
        } else {
            window.location.href = ("/Site/user/login/login.html")
        }
    }
});