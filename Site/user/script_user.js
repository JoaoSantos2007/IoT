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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
    } else {
        // User is signed out
        if (location.pathname == "/Site/user/login/login.html") {
        } else {
            window.location.href = ("/Site/user/login/login.html")
        }
    }
});


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

function carregar_dados_usuario() {
    var div_name = window.document.getElementById("div-name")
    var div_email = window.document.getElementById("div-email")
    var div_foto = window.document.getElementById("div-foto")
    var div_email_verif = window.document.getElementById("div-email_verif")

    const user = firebase.auth().currentUser;
    if (user != null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;

        div_name.innerHTML += `${displayName}`
        div_email.innerHTML += `${email}`
        div_foto.innerHTML += `${photoURL}`
        div_email_verif.innerHTML = `${emailVerified}`
    }
}

function desconectar() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log('OK')
        // An error happened.
    });
}