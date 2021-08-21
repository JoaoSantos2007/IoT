//Firebase
const Categoria = "servers"

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

//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();

//Inicio
var div_lista = window.document.getElementById("lista")
div_lista.innerHTML = ""

db.collection(Categoria).onSnapshot(function (documentos) {
    documentos.docChanges().forEach(function (changes) {
        const documento = changes.doc
        const dados = documento.data()
        let key = documento.id
        if (changes.type === "added") {
            server(dados, key, false)
        } else if (changes.type === "modified") {
            server(dados, key, true)

        } else if (changes.type === "removed") {
            var apagar = window.document.getElementById(key)
            apagar.innerHTML = ""
        }
    })
})


function server(dados, key, modificar) {
    var div_lista = window.document.querySelector('div#lista')
    if (modificar == false) {
        var section = window.document.createElement('section')
        section.setAttribute('id', key)
    } else {
        var section = window.document.getElementById(key)
        section.innerHTML = ""
    }
    var temp = dados.temp
    var server_name = dados.name
    var lugar = dados.location
    section.innerHTML += `<div>`
    section.innerHTML += `<img src="raspberry.png" alt="server_image"> `
    section.innerHTML += `</div>`
    section.innerHTML += `<p>`
    section.innerHTML += `<strong>Hostname: </strong>`
    section.innerHTML += `</p>`
    section.innerHTML += `<p>`
    section.innerHTML += `<strong>Temperatura: </strong>${temp} `
    section.innerHTML += `</p>`
    section.innerHTML += `<p>`
    section.innerHTML += `<strong>Local: </strong> ${lugar}`
    section.innerHTML += `</p>`
    if (modificar == false) {
        div_lista.appendChild(section)
    }
}

var audio = new Audio()
function reproduzir_audio() {
    audio.src = "audios/audio.mp3"
    audio.play()
}
