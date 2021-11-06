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



function login() {
    var email = String((document.getElementById("email")).value)
    var password = String((document.getElementById("password")).value)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user.email)
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
    var div_foto = window.document.getElementById("img-user")

    firebase.auth().onAuthStateChanged((user) => {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;

        div_name.innerHTML += `${displayName}`
        div_email.innerHTML += `${email}`
        if(emailVerified != true){
            var btn_verifEmail = window.document.createElement("input")
            btn_verifEmail.setAttribute("type","button")
            btn_verifEmail.setAttribute("value","Verif Email")
            btn_verifEmail.setAttribute("onclick","verif_email()")
            btn_verifEmail.setAttribute("id","btn_verif_email")
            var section = window.document.getElementById("section_user")
            section.appendChild(btn_verifEmail)
        }
        div_foto.setAttribute("src",String(photoURL))
    });
}

function desconectar() {
    var res_sair = window.confirm("Você deseja encerrar a sessão?")
    if (res_sair == true) {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            window.alert("Erro ao sair")
            // An error happened.
        });
    }
}

function delete_user() {
    var res_delete_user = window.confirm("Você deseja excluir essa conta?")
    if (res_delete_user) {
        firebase.auth().onAuthStateChanged((user) => {
            user.delete().then(() => {
                // User deleted.
            }).catch((error) => {
                window.alert("Ocorreu um erro ao excluir")
            });
        });
    }

}

function update_user_image(){
    firebase.auth().onAuthStateChanged((user) => {
        const photoURL = user.photoURL;
        var image = window.document.getElementById("image-user")
        var url = window.document.getElementById("url-image")
        if(photoURL == null){
            image.setAttribute("src","/Site/images/user.ico")
        }else{
            image.setAttribute("src",String(photoURL))
            url.setAttribute("value",String(photoURL))
        }
    });
}

function cancel_image(){
    window.location.href = ("/Site/index.html")
}

function change_image(){
    var url = String(window.document.getElementById("url-image").value)
    console.log(url)
    firebase.auth().onAuthStateChanged((user) => {
        user.updateProfile({
            photoURL: url
          }).then(() => {
            setInterval(function () {
                window.location.href = ("/Site/index.html")
            }, 1200)
          }).catch((error) => {
            window.alert("Ocorreu um erro ao atualizar sua foto de perfil")
          }); 
    });
}

function verif_email(){
    firebase.auth().onAuthStateChanged((user) => {
        user.sendEmailVerification().then(() => {
          window.alert("Verificação de email enviada!")
        });
    });
}

function edit_displayName(){
    
}