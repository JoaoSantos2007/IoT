function login(){
    
}



const password_input = window.document.getElementById("password")
const img_password = window.document.getElementById("img-pasword")

function alter_img(){
    if(password_input.type == 'password'){
        password_input.setAttribute('type','text')
        img_password.setAttribute('src', '../assets/invisible.png')
    }else if(password_input.type == 'text'){
        password_input.setAttribute('type','password')
        img_password.setAttribute('src', '../assets/view.png')
    }
}

img_password.addEventListener('click', alter_img)