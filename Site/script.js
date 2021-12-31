const Categoria = "devices"

//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();

var path_images = "files/"


db.collection(Categoria).onSnapshot(function (documentos) {
  documentos.docChanges().forEach(function (changes) {
    const documento = changes.doc
    let key = documento.id
    var dados = documento.data()
    if (changes.type === "added") {
      criarItens(key, false)

    } else if (changes.type === "modified") {
      criarItens(key, true)

    } else if (changes.type === "removed") {
      var apagar = window.document.getElementById(key)
      apagar.innerHTML = ""
    }
  })
})


//Tipos
function criarItens(key, modificar) {
  db.collection(Categoria).doc(String(key)).get().then(function (doc) {
    dados = doc.data()
    // var filtro = String((window.document.getElementById("filtro").value))
    // if (filtro == "all" || filtro == dados.type || filtro == dados.location || filtro == dados.deviceId) {
    carregar_layout(dados, key, modificar)
    // }
  })
}



function carregar_layout(dados, key, modificar) {
  var div_lista = window.document.querySelector('main')
  if (modificar == false) {
    var section = window.document.createElement('section')
    section.setAttribute('id', key)
  } else {
    var section = window.document.getElementById(key)
  }

  var nome = dados.name
  var lugar = dados.location
  var tipo = dados.type
  section.innerHTML = ""
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="${path_images}${tipo}.png" alt="${tipo}" height="64px" width="64px">`
  section.innerHTML += `<img id="edit" src="${path_images}edit.png" alt="edit" onclick="editar_registro('${key}')" height="32px" width="32px">`
  section.innerHTML += ` <img id="delete" src="${path_images}delete.png" alt="delete" onclick="deletar('${key}')" height="32px" width="32px">`
  section.innerHTML += `</div>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Nome: </strong>${nome}`
  section.innerHTML += `</p>`
  section.innerHTML += `<p>`
  section.innerHTML += `<strong>Local: </strong>${lugar}`
  section.innerHTML += `</p>`
  section.innerHTML += `<strong>`

  switch (dados.type) {
    case 'light':
      tipo_light(dados, key, section)
      break
    case 'tv':
      tipo_tv(dados, key, section)
      break
    case 'air':
      tipo_air(dados, key, section)
      break
    case 'fan':
      tipo_fan(dados, key, section)
      break
    default:
      tipo_unit(dados, key, section)
  }
  if (modificar == false) {
    div_lista.appendChild(section)
  }
}

function tipo_light(dados, key, section) {
  var settings = dados.settings
  Object.entries(settings).forEach(
    ([_key, value]) => {
      section.innerHTML += `<p>`
      section.innerHTML += `<strong>${_key}: </strong>${value} `
      section.innerHTML += `</p>`
    });
  section.innerHTML += `<div>`
  if (dados.currentValue == "true") {
    section.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga_${key}" onclick="acionar_botao('${key}')" checked>`
  } else {
    section.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga_${key}" onclick="acionar_botao('${key}')">`
  }
  section.innerHTML += `<label for="liga-desliga_${key}" class="liga-desliga__botao"></label>`
  section.innerHTML += `</div>`
}

function tipo_unit(dados, key, section) {
  var valor = dados.currentValue
  section.innerHTML += `<p>`
  section.innerHTML += `<span id="div_valor">Valor:</span>`
  section.innerHTML += `<span id="valor">${valor}</span>`
  section.innerHTML += `</p>`
  section.innerHTML += `</strong>`
}

function tipo_tv(dados, key, section) {
  section.innerHTML += `<div>`
  section.innerHTML += `<img id="power_button" src="${path_images}power.png" alt="power" onclick="actions('${key}','tag#power_tv')">`
  section.innerHTML += `<img id="source_button" src="${path_images}source.png" alt="source" onclick="actions('${key}','tag#source_tv')">`
  section.innerHTML += `<img id="menu_button" src="${path_images}menu.png" alt="menu" onclick="actions('${key}','tag#menu_tv')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="power_button" id="power_button">power</label>`
  section.innerHTML += `<label for="source_button" id="source_button">source</label>`
  section.innerHTML += `<label for="menu_button" id="menu_button">menu</label>`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="canal">`
  section.innerHTML += `<img id="up_button" src="${path_images}up.png" alt="up" onclick="actions('${key}','tag#up_channel')">`
  section.innerHTML += `<label for="channel" id="channel">canal</label>`
  section.innerHTML += `<img id="down_button" src="${path_images}down.png" alt="down" onclick="actions('${key}','tag#down_channel')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="volume">`
  section.innerHTML += `<img id="up_button" src="${path_images}up.png" alt="up" onclick="actions('${key}','tag#up_volume')">`
  section.innerHTML += `<label for="volume" id="volume">volume</label>`
  section.innerHTML += `<img id="down_button_volume" src="${path_images}down.png" alt="down" onclick="actions('${key}','tag#down_volume')">`
  section.innerHTML += `</div>`
}

function tipo_fan(dados, key, section) {
  section.innerHTML += `<div>`
  section.innerHTML += `<img id="power_button" src="${path_images}power.png" alt="power" onclick="actions('${key}','tag#power_fan')">`
  section.innerHTML += `<img id="invert_button" src="${path_images}source.png" alt="invert" onclick="actions('${key}','tag#invert_fan')">`
  section.innerHTML += `<img id="time_button" src="${path_images}chronometer.png" alt="time" onclick="actions('${key}','tag#time_fan')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="power_button" id="power_button">power</label>`
  section.innerHTML += `<label for="invert_button" id="invert_button">invert</label>`
  section.innerHTML += `<label for="menu_button" id="time_button">time</label>`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="button_fan">`
  section.innerHTML += `<img id="up_button" src="${path_images}up.png" alt="up" onclick="actions('${key}','tag#up_fan')">`
  section.innerHTML += `<img id="down_button" src="${path_images}down.png" alt="down" onclick="actions('${key}','tag#down_fan')">`
  section.innerHTML += `</div>`
}

function tipo_air(dados, key, section) {
  section.innerHTML += `<div>`
  section.innerHTML += `<img id="power_button" src="${path_images}power.png" alt="power" onclick="actions('${key}','tag#power_air')">`
  section.innerHTML += `<img id="invert_button" src="${path_images}source.png" alt="invert" onclick="actions('${key}','tag#invert_air')">`
  section.innerHTML += `<img id="time_button" src="${path_images}chronometer.png" alt="time" onclick="actions('${key}','tag#time_air')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="power_button" id="power_button">power</label>`
  section.innerHTML += `<label for="invert_button" id="invert_button">invert</label>`
  section.innerHTML += `<label for="menu_button" id="time_button">time</label>`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="button_air">`
  section.innerHTML += `<img id="up_button" src="${path_images}up.png" alt="up" onclick="actions('${key}','tag#up_air')">`
  section.innerHTML += `<label for="temp" id="temp">Temp</label>`
  section.innerHTML += `<img id="down_button" src="${path_images}down.png" alt="down" onclick="actions('${key}','tag#down_air')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div id="button_air2">`
  section.innerHTML += `<img id="sleep_button" src="${path_images}power.png" alt="sleep" onclick="actions('${key}','tag#sleep_air')">`
  section.innerHTML += `<img id="swing_button" src="${path_images}power.png" alt="swing" onclick="actions('${key}','tag#swing_air')">`
  section.innerHTML += `</div>`
  section.innerHTML += `<div>`
  section.innerHTML += `<label for="sleep_button" id="sleep_button">sleep</label>`
  section.innerHTML += `<label for="swing_button" id="swing_button">swing</label>`
  section.innerHTML += `</div>`
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

function actions(key, atualizar) {
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

    //Opções
    select = document.createElement('select')
    select.setAttribute('id', 'txttype_' + key)
    select.innerHTML += `<option id = 'opt_light_${key}' value="light">Luz</option>`
    select.innerHTML += `<option id = 'opt_temperatura_${key}' value="temperatura">Temperatura</option>`
    select.innerHTML += `<option id = 'opt_proximidade_${key}' value="proximidade">Proximidade</option>`
    select.innerHTML += `<option id = 'opt_luminosidade_${key}' value="luminosidade">Luminosidade</option> `
    select.innerHTML += `<option id = 'opt_tv_${key}' value="tv">TV</option> `
    select.innerHTML += `<option id = 'opt_air_${key}' value="air">Ar-Condicionado</option>`
    select.innerHTML += `<option id = 'opt_fan_${key}' value="fan">Ventilador</option>`
    select.innerHTML += `<option id = 'opt_umidade_${key}' value="umidade">Umidade</option>`
    select.innerHTML += `<option id = 'opt_presenca_${key}' value="presenca">Presença</option>`
    section.appendChild(select)
    section.innerHTML += `</div>`
    var opcao = window.document.getElementById(`opt_${tipo}_${key}`)
    opcao.setAttribute('selected', 'true')

    //Botões atualizar e calcelar
    section.innerHTML += `<div>`
    section.innerHTML += `<input type="button" value="Atualizar" onclick="reproduzir_audio(),enviar('${key}')">`
    section.innerHTML += `<input type="button" value="Cancelar" onclick="criarItens('${key}', true),reproduzir_audio()">`
    section.innerHTML += `</div>`
  })
}

function enviar(key) {
  var type_enviar = String((window.document.getElementById("txttype_" + key).value))
  var name_enviar = String((window.document.getElementById("txtname_" + key).value))
  var local_enviar = String((window.document.getElementById("txtlocation_" + key).value))
  var id_enviar = Number((window.document.getElementById("txtid_" + key).value))
  db.collection(Categoria).doc(key).update({
    'name': name_enviar,
    'type': type_enviar,
    'location': local_enviar,
    'deviceId': id_enviar,
  })
}

var audio = new Audio()
function reproduzir_audio() {
  audio.src = "files/audio.mp3"
  audio.play()
}