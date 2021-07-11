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


//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();

function iniciar() {
  db.collection(Categoria).onSnapshot(function (documentos) {
    documentos.docChanges().forEach(function (changes) {
      if (changes.type === "added") {
        const documento = changes.doc
        const dados = documento.data()
        let key = documento.id
        criarItens(dados, key)

      } else if (changes.type === "modified") {
        const documento_modificar = changes.doc
        const dados_modificar = documento_modificar.data()
        let key_modificar = documento_modificar.id
        modificarItens(dados_modificar, key_modificar)

      } else if (changes.type === "removed") {
        const documento_apagar = changes.doc
        let key_apagar = documento_apagar.id
        var apagar = window.document.getElementById(key_apagar)
        apagar.innerHTML = ""
      }
    })
  })
}

function criarItens(dados, key) {
  if (dados.type == "light") {
    tipo_light(dados, key)
  } else if (dados.type == "umidade") {
    tipo_umidade(dados, key)
  } else if (dados.type == "temperatura") {
    tipo_temperatura(dados, key)
  } else if (dados.type == "proximidade") {
    tipo_proximidade(dados, key)
  } else if (dados.type == "luminosidade") {
    tipo_luminosidade(dados, key)
  }
}

function modificarItens(dados, key) {
  if (dados.type == "light") {
    modificar_tipo_light(dados, key)
  } else if (dados.type == "umidade") {
    modificar_tipo_umidade(dados, key)
  } else if (dados.type == "temperatura") {
    modificar_tipo_temperatura(dados, key)
  } else if (dados.type == "proximidade") {
    modificar_tipo_proximidade(dados, key)
  } else if (dados.type == "luminosidade") {
    modificar_tipo_luminosidade(dados, key)
  }
}

function tipo_light(dados, key) {
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.location
  section.setAttribute('id', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/light.png" alt="image"> `
  section.innerHTML += `<img id = "edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
  section.innerHTML += `<img id = "delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('` + key + `')">`
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
  div_lista.appendChild(section)
}

function modificar_tipo_light(dados, key) {
  var section = window.document.getElementById(key)
  var nome = dados.name
  var lugar = dados.location
  section.innerHTML = ""
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/light.png" alt="image"> `
  section.innerHTML += `<img id = "edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
  section.innerHTML += `<img id = "delete" src="/Site/images/delete.png" alt="delete" onclick="deletar('` + key + `')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome} `
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong> ${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<div>`
  if (dados.currentValue == "true") {
    section.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga" onclick="acionar_botao('${key}')" checked>`
  } else {
    section.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga" onclick="acionar_botao('${key}')">`
  }
  section.innerHTML += `<label for="liga-desliga" class="liga-desliga__botao"></label>`
  section.innerHTML += `</div>`
}

function tipo_umidade(dados, key) {
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.setAttribute('id', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/umidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
  div_lista.appendChild(section)
}

function modificar_tipo_umidade(dados, key) {
  var section = window.document.getElementById(key)
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML = ""
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/umidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
}

function tipo_temperatura(dados, key) {
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.setAttribute('id', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/temperatura.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
  div_lista.appendChild(section)
}

function modificar_tipo_temperatura(dados, key) {
  var section = window.document.getElementById(key)
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML = ""
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/temperatura.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
}

function tipo_proximidade(dados, key) {
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.setAttribute('id', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/proximidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
  div_lista.appendChild(section)
}

function modificar_tipo_proximidade(dados, key) {
  var section = window.document.getElementById(key)
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML = ""
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/proximidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
}

function tipo_luminosidade(dados, key) {
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.setAttribute('id', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/luminosidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
  div_lista.appendChild(section)
}

function modificar_tipo_luminosidade(dados, key) {
  var section = window.document.getElementById(key)
  var nome = dados.name
  var lugar = dados.location
  var valor = dados.currentValue
  section.innerHTML = ""
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/luminosidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="editar_registro('` + key + `')">`
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
}

function acionar_botao(chave) {
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

function deletar(chave) {
  if (window.confirm("Você realmente quer apagar esse registro?")) {
    db.collection(Categoria).doc(chave).delete()
  }
}

function criar_registro() {
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
  // window.location.href = ("/Site/index.html")
}

function editar_registro(key) {
  db.collection(Categoria).doc(key).get().then(function (doc) {
    var dados = doc.data()
    var id = dados.deviceId
    var nome = dados.name
    var lugar = dados.local
    var tipo = dados.type
    window.alert(nome)
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
    select.setAttribute('id', 'txttype_'+key)
    if (tipo == "light") {
      select.innerHTML += `<option value="light" selected>Luz</option>`
    } else {
      select.innerHTML += `<option value="light">Luz</option>`
    }
    if (tipo == "temperatura") {
      select.innerHTML += `<option value="temperatura" selected>Temperatura</option>`
    } else {
      select.innerHTML += `<option value="temperatura">Temperatura</option>`
    }
    if (tipo == "proximidade") {
      select.innerHTML += `<option value="proximidade" selected>Proximidade</option>`
    } else {
      select.innerHTML += `<option value="proximidade">Proximidade</option>`
    }
    if (tipo == "luminosidade") {
      select.innerHTML += `<option value="luminosidade" selected>Luminosidade</option>`
    } else {
      select.innerHTML += `<option value="luminosidade">Luminosidade</option>`
    }
    if (tipo == "tv") {
      select.innerHTML += `<option value="tv" selected>TV</option>`
    } else {
      select.innerHTML += `<option value="tv">TV</option>`
    }
    if (tipo == "air") {
      select.innerHTML += `<option value="air" selected>Ar-Condicionado</option>`
    } else {
      select.innerHTML += `<option value="air">Ar-Condicionado</option>`
    }
    if(tipo == "fan"){
      select.innerHTML += `<option value="fan" selected>Ventilador</option>`
    }else{
      select.innerHTML += `<option value="fan">Ventilador</option>`
    }
    if(tipo == "umidade"){
      select.innerHTML += `<option value="umidade" selected>Umidade</option>`
    }else{
      select.innerHTML += `<option value="umidade">Umidade</option>`
    }
    section.appendChild(select)
    section.innerHTML += `</div>`
    section.innerHTML += `<div>`
    section.innerHTML += `<input type="button" value="Submit" onclick="enviar('${key}')">`
    section.innerHTML += `<input type="button" value="Cancelar" onclick="recarregar()">`
    section.innerHTML += `</div>`
  })
}

function recarregar(){
  location.reload()
}

function enviar(key){
  var type_enviar = String((window.document.getElementById("txttype_"+key).value))
  var name_enviar = String((window.document.getElementById("txtname_"+key).value))
  var local_enviar = String((window.document.getElementById("txtlocation_"+key).value))
  var id_enviar = String((window.document.getElementById("txtid_"+key).value))
  db.collection(Categoria).doc(key).update({
    'name': name_enviar,
    'type': type_enviar,
    'local': local_enviar,
    'deviceId': id_enviar,
  })
}

var audio = new Audio()
function reproduzir_audio() {
  audio.src = "audios/audio.mp3"
  audio.play()
  window.alert("ok")
}