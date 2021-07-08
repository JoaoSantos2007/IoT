var audio = new Audio()

function reproduzir_audio() {
  audio.src = "audios/audio.mp3"
  audio.play()
  window.alert("ok")
}

//Armazena as credenciais do Firebase em uma constante
const firebaseConfig = {
  apiKey: "AIzaSyDu-JTPXU0xU0xhAj8fACBbWfXcxuPOrmw",
  authDomain: "teste-345e7.firebaseapp.com",
  projectId: "teste-345e7",
  storageBucket: "teste-345e7.appspot.com",
  messagingSenderId: "939130156420",
  appId: "1:939130156420:web:2b7f5f78068e19aac259d1",
  measurementId: "G-WLED1GNYY6"
};


//Inicializa o Firebase com a constante contendo as credenciais do Firebase
firebase.initializeApp(firebaseConfig)


//Armazena as informações do database do firebase em uma variável
let db = firebase.firestore();


var item = window.document.querySelector('div#itens')

db.collection("Categorias").onSnapshot(function (documentos, item) {
  documentos.docChanges().forEach(function (changes, item) {
    if (changes.type === "added") {

      const documento = changes.doc
      const dados = documento.data()
      let key = documento.id
      console.log(key)

      criarItens(dados, key)

    } else if (changes.type === "modified") {

    } else if (changes.type === "removed") {

    }
  })
})


function criarItens(dados, key) {
  if (dados.type == "light") {
    console.log(key)
    tipo_light(dados, key)
  } else if (dados.type == "umidade_temperatura") {
    tipo_umidade_temperatura(dados, documento);
  }
}


function tipo_light(dados, key) {
  var div_lista = window.document.querySelector('div#lista')

  // Criar section
  var section = window.document.createElement("section")
  section.setAttribute("id", "itens")

  //Criar div
  var div = window.document.createElement('div')
  // divisão.setAttribute("id", key)


  //Criar imagem
  var img = window.document.createElement('img')
  img.setAttribute('src', 'images/ideia.png')

  //Criar Botão
  var botao = `<input type="checkbox" class="liga-desliga__checkbox" id="botao_${key}" onclick="acionar_botao('${key}')">`
  var label = `<label for="liga-desliga" class="liga-desliga__botao"></label>`


  div.appendChild(img)
  div.innerHTML += botao
  div.innerHTML += label
  section.appendChild(div)
  div_lista.appendChild(section)

}


function acionar_botao(chave){
  window.alert(chave)
  db.collection("Categorias").onSnapshot(function (documentos, item) {
    const documento = changes.doc
    const dados = documento.data()
    let key = documento.id
    if(key == chave){
      dados.currentValue = (!dados.value)
    }
  })

}

var teste = window.document.getElementById("teste")