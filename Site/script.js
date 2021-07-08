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
  // var div_lista = window.document.querySelector('div#lista')

  // // Criar section
  // var section = window.document.createElement("section")
  // section.setAttribute("id", "itens")

  // // lugar.innerHTML += `<div id="teste>`
  // // lugar.innerHTML += `<img src="images/ideia.png" alt="image"></img>`
  // // lugar.innerHTML += `<input type="checkbox" class="liga-desliga__checkbox" id="liga-desliga" onclick="acionar_botao(${key})">`
  // // lugar.innerHTML += `<label for="liga-desliga" class="liga-desliga__botao"></label> `
  // // lugar.innerHTML += `</div>`


  // //Criar div
  // var div = window.document.createElement('div')
  // // divisão.setAttribute("id", key)


  // //Criar imagem
  // var img = window.document.createElement('img')
  // img.setAttribute('src', 'images/light.png')


  // var botao = `<input type="checkbox" class="liga-desliga__checkbox" id="botao_${key}" onclick="acionar_botao">`
  // botao += `<label for="liga-desliga" class="liga-desliga__botao"></label>`


  // div.appendChild(img)
  // div.innerHTML += botao
  // section.appendChild(div)
  // div_lista.appendChild(section)

}



function acionar_botao(chave){
  console.log(chave)
}




// botao = window.document.getElementById("liga-desliga")
// label = window.document.getElementById("hello")
// if (botao.checked) {

// } else {
//   botao.checked = true
// }

var teste = window.document.getElementById("teste")