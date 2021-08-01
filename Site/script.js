//Firebase

const Categoria = "devices"

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
    if (location.pathname == "/Site/login/index.html"){
    }else{
      window.location.href = ("/Site/login/index.html")
    }
  }
});
//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();



//Inicio
function iniciar() {
  db.collection(Categoria).onSnapshot(function (documentos) {
    documentos.docChanges().forEach(function (changes) {
      const documento = changes.doc
      const dados = documento.data()
      let key = documento.id
      if (changes.type === "added") {
        criarItens(dados, key, false)

      } else if (changes.type === "modified") {
        criarItens(dados, key, true)

      } else if (changes.type === "removed") {
        var apagar = window.document.getElementById(key)
        apagar.innerHTML = ""
      }
    })
  })
}

//Tipos
function criarItens(dados, key, modificar) {
  if (dados.type == "light") tipo_light(dados, key, modificar)
  else if (dados.type == "umidade") tipo_umidade(dados, key, modificar)
  else if (dados.type == "temperatura") tipo_temperatura(dados, key, modificar)
  else if (dados.type == "proximidade") tipo_proximidade(dados, key, modificar)
  else if (dados.type == "luminosidade") tipo_luminosidade(dados, key, modificar)
  else if (dados.type == "tv") tipo_tv(dados, key, modificar)
  else if (dados.type == "fan") tipo_fan(dados, key, modificar)
  else if (dados.type == "air") tipo_air(dados, key, modificar)
  else if (dados.type == "presenca") tipo_presenca(dados, key, modificar)
}

function tipo_light(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/light.png" alt="light"> `
  section.innerHTML += `<img id = "edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += `<img id = "delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome} `
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong> ${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<div>`
  if (dados.currentValue == "true") {
    section.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga_${key}" onclick="acionar_botao('${key}')" checked>`
  } else {
    section.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga_${key}" onclick="acionar_botao('${key}')">`
  }
  section.innerHTML += `<label for="liga-desliga_${key}" class="liga-desliga__botao"></label>`
  section.innerHTML += `</div>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_umidade(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/umidade.png" alt="umidade">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += ` <img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<strong>`
  section.innerHTML += `<p>`
  section.innerHTML += `<span id="div_valor">Valor:</span>`
  section.innerHTML += `<span id="valor">${valor}</span>`
  section.innerHTML += `</p>`
  section.innerHTML += `</strong>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_presenca(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/camera.png" alt="presença">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += ` <img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<strong>`
  section.innerHTML += `<p>`
  section.innerHTML += `<span id="div_valor">Valor:</span>`
  section.innerHTML += `<span id="valor">${valor}</span>`
  section.innerHTML += `</p>`
  section.innerHTML += `</strong>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_temperatura(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/temperatura.png" alt="temperatura">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += ` <img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<strong>`
  section.innerHTML += `<p>`
  section.innerHTML += `<span id="div_valor">Valor:</span>`
  section.innerHTML += `<span id="valor">${valor}</span>`
  section.innerHTML += `</p>`
  section.innerHTML += `</strong>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_proximidade(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/proximidade.png" alt="proximidade">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += ` <img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<strong>`
  section.innerHTML += `<p>`
  section.innerHTML += `<span id="div_valor">Valor:</span>`
  section.innerHTML += `<span id="valor">${valor}</span>`
  section.innerHTML += `</p>`
  section.innerHTML += `</strong>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_luminosidade(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/luminosidade.png" alt="luminosidade">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += ` <img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<strong>`
  section.innerHTML += `<p>`
  section.innerHTML += `<span id="div_valor">Valor:</span>`
  section.innerHTML += `<span id="valor">${valor}</span>`
  section.innerHTML += `</p>`
  section.innerHTML += `</strong>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_tv(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/tv.png" alt="tv">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += `<img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<div>`
  section.innerHTML += `<img id="power_button" src="/Site/images/power.png" alt="power" onclick="tv_actions('${key}','tag#power_tv')">`
  section.innerHTML += `<img id="source_button" src="/Site/images/source.png" alt="source" onclick="tv_actions('${key}','tag#source_tv')">`
  section.innerHTML += `<img id="menu_button" src="/Site/images/menu.png" alt="menu" onclick="tv_actions('${key}','tag#menu_tv')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="power_button" id="power_button">power</label>`
  section.innerHTML += `<label for="source_button" id="source_button">source</label>`
  section.innerHTML += `<label for="menu_button" id="menu_button">menu</label>`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="canal">`
  section.innerHTML += `<img id="up_button" src="/Site/images/up.png" alt="up" onclick="tv_actions('${key}','tag#up_channel')">`
  section.innerHTML += `<label for="channel" id="channel">canal</label>`
  section.innerHTML += `<img id="down_button" src="/Site/images/down.png" alt="down" onclick="tv_actions('${key}','tag#down_channel')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="volume">`
  section.innerHTML += `<img id="up_button" src="/Site/images/up.png" alt="up" onclick="tv_actions('${key}','tag#up_volume')">`
  section.innerHTML += `<label for="volume" id="volume">volume</label>`
  section.innerHTML += `<img id="down_button_volume" src="/Site/images/down.png" alt="down" onclick="tv_actions('${key}','tag#down_volume')">`
  section.innerHTML += `</div>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_fan(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/fan.png" alt="ventilador">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += `<img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<div>`
  section.innerHTML += `<img id="power_button" src="/Site/images/power.png" alt="power" onclick="fan_actions('${key}','tag#power_fan')">`
  section.innerHTML += `<img id="invert_button" src="/Site/images/source.png" alt="invert" onclick="fan_actions('${key}','tag#invert_fan')">`
  section.innerHTML += `<img id="time_button" src="/Site/images/chronometer.png" alt="time" onclick="fan_actions('${key}','tag#time_fan')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="power_button" id="power_button">power</label>`
  section.innerHTML += `<label for="invert_button" id="invert_button">invert</label>`
  section.innerHTML += `<label for="menu_button" id="time_button">time</label>`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="button_fan">`
  section.innerHTML += `<img id="up_button" src="/Site/images/up.png" alt="up" onclick="fan_actions('${key}','tag#up_fan')">`
  section.innerHTML += `<img id="down_button" src="/Site/images/down.png" alt="down" onclick="fan_actions('${key}','tag#down_fan')">`
  section.innerHTML += `</div>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_air(dados, key, modificar) {
  var div_lista = window.document.querySelector('div#lista')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
    section.innerHTML = ""
  }
  var nome = dados.name
  var lugar = dados.location
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/snow.png" alt="AC">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('${key}')">`
  section.innerHTML += `<img id="delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('${key}')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<div>`
  section.innerHTML += `<img id="power_button" src="/Site/images/power.png" alt="power" onclick="air_actions('${key}','tag#power_air')">`
  section.innerHTML += `<img id="invert_button" src="/Site/images/source.png" alt="invert" onclick="air_actions('${key}','tag#invert_air')">`
  section.innerHTML += `<img id="time_button" src="/Site/images/chronometer.png" alt="time" onclick="air_actions('${key}','tag#time_air')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="power_button" id="power_button">power</label>`
  section.innerHTML += `<label for="invert_button" id="invert_button">invert</label>`
  section.innerHTML += `<label for="menu_button" id="time_button">time</label>`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="button_air">`
  section.innerHTML += `<img id="up_button" src="/Site/images/up.png" alt="up" onclick="air_actions('${key}','tag#up_air')">`
  section.innerHTML += `<label for="temp" id="temp">Temp</label>`
  section.innerHTML += `<img id="down_button" src="/Site/images/down.png" alt="down" onclick="air_actions('${key}','tag#down_air')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="button_air2">`
  section.innerHTML += `<img id="sleep_button" src="/Site/images/power.png" alt="sleep" onclick="air_actions('${key}','tag#sleep_air')">`
  section.innerHTML += `<img id="swing_button" src="/Site/images/power.png" alt="swing" onclick="air_actions('${key}','tag#swing_air')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="sleep_button" id="sleep_button">sleep</label>`
  section.innerHTML += `<label for="swing_button" id="swing_button">swing</label>`
  section.innerHTML += `</div>`
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}


//Ações
function acionar_botao(chave) {
  reproduzir_audio()
  db.collection(Categoria).doc(chave).get().then(function (doc) {
    dados = doc.data()
    valor_atual = dados.currentValue
    if (valor_atual == "false") {
      db.collection(Categoria).doc(chave).update({
        'currentValue': 'true'
      })
    } else {
      db.collection(Categoria).doc(chave).update({
        'currentValue': 'false'
      })
    }
  })
}

function tv_actions(key, atualizar) {
  reproduzir_audio()
  db.collection(Categoria).doc(key).update({
    'currentValue': atualizar
  })
}

function fan_actions(key, atualizar) {
  reproduzir_audio()
  db.collection(Categoria).doc(key).update({
    'currentValue': atualizar
  })
}

function air_actions(key, atualizar) {
  reproduzir_audio()
  db.collection(Categoria).doc(key).update({
    'currentValue': atualizar
  })
}

function deletar(chave) {
  reproduzir_audio()
  if (window.confirm("Você realmente quer apagar esse registro?")) {
    db.collection(Categoria).doc(chave).delete()
  }
}

function criar_registro() {
  reproduzir_audio()
  var type = String((window.document.getElementById("txttype").value))
  var name = String((window.document.getElementById("txtname").value))
  var local = String((window.document.getElementById("txtlocation").value))
  var id = String((window.document.getElementById("txtid").value))
  db.collection(Categoria).doc().set({
    'deviceId': id,
    'type': type,
    'name': name,
    'location': local,
    'currentValue': ' - - '
  })
  window.alert("Registro criado")
  setInterval(function () {
    window.location.href = ("/Site/index.html")
  }, 1000)
}

function editar_registro(key) {
  reproduzir_audio()
  db.collection(Categoria).doc(key).get().then(function (doc) {
    var dados = doc.data()
    var id = dados.deviceId
    var nome = dados.name
    var lugar = dados.location
    var tipo = dados.type
    section = document.getElementById(key)
    section.innerHTML = ""
    section.innerHTML += "<div>"
    section.innerHTML += `id: `
    section.innerHTML += `<input type="number" name="txtid" id="txtid_${key}" value = "${id}">`
    section.innerHTML += `</div>`
    section.innerHTML += `<div>`
    section.innerHTML += `name:`
    section.innerHTML += `<input type="text" name="txtname" id="txtname_${key}" value = "${nome}">`
    section.innerHTML += `</div>`
    section.innerHTML += `<div>`
    section.innerHTML += `location:`
    section.innerHTML += `<input type="text" name="txtlocation" id="txtlocation_${key}" value = "${lugar}">`
    section.innerHTML += `</div>`
    section.innerHTML += `<div>`
    section.innerHTML += `type:`
    select = document.createElement('select')
    select.setAttribute('id', 'txttype_' + key)
    if (tipo == "light") select.innerHTML += `<option value="light" selected>Luz</option>`
    else select.innerHTML += `<option value="light">Luz</option>`

    if (tipo == "temperatura") select.innerHTML += `<option value="temperatura" selected>Temperatura</option>`
    else select.innerHTML += `<option value="temperatura">Temperatura</option>`

    if (tipo == "proximidade") select.innerHTML += `<option value="proximidade" selected>Proximidade</option>`
    else select.innerHTML += `<option value="proximidade">Proximidade</option>`

    if (tipo == "luminosidade") select.innerHTML += `<option value="luminosidade" selected>Luminosidade</option>`
    else select.innerHTML += `<option value="luminosidade">Luminosidade</option>`

    if (tipo == "tv") select.innerHTML += `<option value="tv" selected>TV</option>`
    else select.innerHTML += `<option value="tv">TV</option>`

    if (tipo == "air") select.innerHTML += `<option value="air" selected>Ar-Condicionado</option>`
    else select.innerHTML += `<option value="air">Ar-Condicionado</option>`

    if (tipo == "fan") select.innerHTML += `<option value="fan" selected>Ventilador</option>`
    else select.innerHTML += `<option value="fan">Ventilador</option>`

    if (tipo == "umidade") select.innerHTML += `<option value="umidade" selected>Umidade</option>`
    else select.innerHTML += `<option value="umidade">Umidade</option>`

    if (tipo == "presenca") select.innerHTML += `<option value="presenca" selected>Presença</option>`
    else select.innerHTML += `<option value="presenca">Presença</option>`

    section.appendChild(select)
    section.innerHTML += `</div>`
    section.innerHTML += `<div>`
    section.innerHTML += `<input type="button" value="Submit" onclick="enviar('${key}')">`
    section.innerHTML += `<input type="button" value="Cancelar" onclick="location.reload()">`
    section.innerHTML += `</div>`
  })
}

function enviar(key) {
  reproduzir_audio()
  var type_enviar = String((window.document.getElementById("txttype_" + key).value))
  var name_enviar = String((window.document.getElementById("txtname_" + key).value))
  var local_enviar = String((window.document.getElementById("txtlocation_" + key).value))
  var id_enviar = String((window.document.getElementById("txtid_" + key).value))
  db.collection(Categoria).doc(key).update({
    'name': name_enviar,
    'type': type_enviar,
    'location': local_enviar,
    'deviceId': id_enviar,
  })
}

var audio = new Audio()
function reproduzir_audio() {
  audio.src = "audios/audio.mp3"
  audio.play()
}

function login() {
  var email = String(document.getElementById("email").value)
  var password = String(document.getElementById("password").value)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    setInterval(function () {
      window.location.href = ("/Site/index.html")
    }, 1000)
  })
  .catch((error) => {
    window.alert("Email ou senha errado")
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}