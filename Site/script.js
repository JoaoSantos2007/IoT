var audio = new Audio()

function reproduzir_audio() {
  audio.src = "audios/audio.mp3"
  audio.play()
  window.alert("ok")
}

//Armazena as credenciais do Firebase em uma constante
const firebaseConfig = {
  // apiKey: "AIzaSyDu-JTPXU0xU0xhAj8fACBbWfXcxuPOrmw",
  // authDomain: "teste-345e7.firebaseapp.com",
  // projectId: "teste-345e7",
  // storageBucket: "teste-345e7.appspot.com",
  // messagingSenderId: "939130156420",
  // appId: "1:939130156420:web:2b7f5f78068e19aac259d1",
  // measurementId: "G-WLED1GNYY6"
  apiKey: "AIzaSyCoZBonmOjR0JdmJlnGx338KujPBk61wuI",
  authDomain: "teste2-4ac49.firebaseapp.com",
  projectId: "teste2-4ac49",
  storageBucket: "teste2-4ac49.appspot.com",
  messagingSenderId: "571684171981",
  appId: "1:571684171981:web:7623e6fb860175fc023984",
  measurementId: "G-BR5S3M0QT7"
};


//Inicializa o Firebase com a constante contendo as credenciais do Firebase
firebase.initializeApp(firebaseConfig)


//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();

db.collection("Categorias").onSnapshot(function (documentos) {
  documentos.docChanges().forEach(function (changes) {
    if (changes.type === "added") {

      const documento = changes.doc
      const dados = documento.data()
      let key = documento.id
      console.log(key)

      criarItens(dados, key)

    } else if (changes.type === "modified") {
      modificarItens(dados, key)

    } else if (changes.type === "removed") {
      const documento_apagar = changes.doc
      let key_apagar = documento_apagar.id
      var name = "section." + key_apagar
      var apagar = window.document.querySelector(name)
      apagar.innerHTML = ""

    }
  })
})


function criarItens(dados, key) {
  if (dados.type == "light") {
    tipo_light(dados, key)
  } else if (dados.type == "umidade") {
    tipo_umidade(dados, key)
  }else if(dados.type == "temperatura"){
    tipo_temperatura(dados, key)
  }else if(dados.type == "proximidade"){
    tipo_proximidade(dados, key)
  }else if(dados.type == "luminosidade"){
    tipo_luminosidade(dados, key)
  }
}

function modificarItens(dados, key){
  if (dados.type == "light") {
    tipo_light(dados, key)
  } else if (dados.type == "umidade") {
    tipo_umidade(dados, key)
  }else if(dados.type == "temperatura"){
    tipo_temperatura(dados, key)
  }else if(dados.type == "proximidade"){
    tipo_proximidade(dados, key)
  }else if(dados.type == "luminosidade"){
    tipo_luminosidade(dados, key)
  }
}

function tipo_light(dados, key) {
  var key = "" + key
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.local
  section.setAttribute('id', 'itens')
  section.setAttribute('class', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/light.png" alt="image"> `
  section.innerHTML += `<img id = "edit" src="/Site/images/edit.png" alt="edit" onclick="testar()">`
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
  div_lista.appendChild(section)
}

function tipo_umidade(dados, key) {
  var key = "" + key
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.local
  var valor = dados.currentValue
  section.setAttribute('id', 'itens')
  section.setAttribute('class', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/umidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="">`
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

function tipo_temperatura(dados, key) {
  var key = "" + key
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.local
  var valor = dados.currentValue
  section.setAttribute('id', 'itens')
  section.setAttribute('class', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/temperatura.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="">`
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

function tipo_proximidade(dados, key) {
  var key = "" + key
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.local
  var valor = dados.currentValue
  section.setAttribute('id', 'itens')
  section.setAttribute('class', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/proximidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="">`
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

function tipo_luminosidade(dados, key) {
  var key = "" + key
  var div_lista = window.document.querySelector('div#lista')
  var section = window.document.createElement('section')
  var nome = dados.name
  var lugar = dados.local
  var valor = dados.currentValue
  section.setAttribute('id', 'itens')
  section.setAttribute('class', key)
  section.innerHTML += `<div>`
  section.innerHTML += `<img src="/Site/images/luminosidade.png" alt="image">`
  section.innerHTML += `<img id="edit" src="/Site/images/edit.png" alt="edit" onclick="">`
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

function acionar_botao(chave) {
  window.alert(chave)
  db.collection("Categorias").doc(chave).get().then(function (doc) {
    dados = doc.data()
    valor_atual = dados.currentValue
    if (valor_atual == "false") {
      db.collection("Categorias").doc(chave).update({
        'currentValue': 'true'
      })
    } else {
      db.collection("Categorias").doc(chave).update({
        'currentValue': 'false'
      })
    }
  })
}

function deletar(chave) {
  if (window.confirm("Você realmente quer apagar esse registro?")) {
    db.collection("Categorias").doc(chave).delete()
  }
}

