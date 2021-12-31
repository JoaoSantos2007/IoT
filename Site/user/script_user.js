

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
            image.setAttribute("src","/Site/images/user.png")
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
    var displayName_DIV = window.document.getElementById("div-displayName")

    window.document.getElementById("edit_displayName").remove()
    window.document.getElementById("div-name").remove()

    var TxtDisplayName = window.document.createElement("input")
    TxtDisplayName.setAttribute("type","text")
    TxtDisplayName.setAttribute("id","txt_displayName")
    firebase.auth().onAuthStateChanged((user) => {
        
        TxtDisplayName.setAttribute("value",user.displayName)
    });
    displayName_DIV.appendChild(TxtDisplayName)

    var img_save_DisplayName = window.document.createElement("img")
    img_save_DisplayName.setAttribute("src","/Site/images/checked.png")
    img_save_DisplayName.setAttribute("onclick","save_edit_displayName()")
    img_save_DisplayName.setAttribute("id","img_save_edit_displayName")
    displayName_DIV.appendChild(img_save_DisplayName)

    var img_cancel_DisplayName = window.document.createElement("img")
    img_cancel_DisplayName.setAttribute("src","/Site/images/error.png")
    img_cancel_DisplayName.setAttribute("onclick","window.location.reload()")
    img_cancel_DisplayName.setAttribute("id","img_cancel_edit_DisplayName")
    displayName_DIV.appendChild(img_cancel_DisplayName)
}

function save_edit_displayName(){
    var txt_displayName_save = String(window.document.getElementById("txt_displayName").value)
    firebase.auth().onAuthStateChanged((user) => {
        user.updateProfile({
            displayName: txt_displayName_save,
        }).then(() => {
            setInterval(function () {
                window.location.reload()
            }, 1000)
        }).catch((error) => {
            window.alert("Erro ao alterar DisplayName")
        });  
    });
}