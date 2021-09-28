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

function login() {
    var email = String((document.getElementById("email")).value)
    var password = String((document.getElementById("password")).value)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
            // Success 
            window.location.href = ("/Site/index.html")
        })
        .catch(function (error) {
            // Error Handling
            window.alert("Email ou senha errado!")
        });
}
