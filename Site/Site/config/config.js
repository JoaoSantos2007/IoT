getUser()

function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
        return(sync_userInformation(user))
    })

} 


function sync_userInformation(user){
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    if(photoURL != null)window.document.getElementById('userImage').setAttribute('src',photoURL)
    if(displayName != null)window.document.getElementById('displayName').innerText = displayName
    window.document.getElementById('email').innerText = email
    if(emailVerified != true)window.document.getElementById('div-verifEmail').style.display = 'block'




}


//Desconectar
function desconectar(){
    const confirm_logout = window.confirm("Você deseja encerrar a sessão?")
    if(confirm_logout){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            window.alert("Erro ao sair")
            // An error happened.
        });
    }
}

//Delete User
function deleteAccount(){
    const confirm_deleteAccount = window.confirm("Você deseja excluir essa conta?")
    if(confirm_deleteAccount){
        firebase.auth().onAuthStateChanged((user) => {
            const text_confirm_deleteAccount = window.prompt(`Digite, ${user.displayName}, para confirmar`)
            if(text_confirm_deleteAccount == user.displayName){
                user.delete().then(() => {
                    // User deleted.
                }).catch((error) => {
                    window.alert("Ocorreu um erro ao excluir")
                });
            }
        })
    }
}

function verifEmail(){
    firebase.auth().onAuthStateChanged((user) => {
        user.sendEmailVerification().then(() => {
          window.alert("Verificação de email enviada!")
        });
    });
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