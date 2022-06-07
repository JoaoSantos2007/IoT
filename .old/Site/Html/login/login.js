function login() {
    var email = String((document.getElementById("email")).value)
    var password = String((document.getElementById("password")).value)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user.email)
            // Success 
            window.location.href = ("../index.html")
        })
        .catch(function (error) {
            // Error Handling
            window.alert("Email ou senha errado!")
        });
}

const password_input = window.document.getElementById("password")
const img_password = window.document.getElementById("img-pasword")

function alter_img(){
    if(password_input.type == 'password'){
        password_input.setAttribute('type','text')
        img_password.setAttribute('src', '../files/invisible.png')
    }else if(password_input.type == 'text'){
        password_input.setAttribute('type','password')
        img_password.setAttribute('src', '../files/view.png')
    }
}

img_password.addEventListener('click', alter_img)